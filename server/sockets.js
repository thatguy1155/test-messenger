const onlineUsers = require("./onlineUsers");
const { Conversation } = require("./db/models");

module.exports = (io,userId) => {
  let clients = {}
  
  io.on("connection", (socket) => {
    clients[userId] = socket.id;
    console.log("connected with ", userId)
    socket.on("go-online", (id) => {
      if (!onlineUsers.includes(id)) {
        onlineUsers.push(id);
      }
      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });
  
    socket.on("new-message", async (data) => {
      const convoId = data.message.conversationId;
      const conversation = convoId && await Conversation.findConversationByPK(convoId);
      if (conversation) sendMessageViaSocket({convoData: conversation.dataValues, senderId: data.message.senderId, messageData: data })
    });
    
    socket.on("mark-as-read", async (data) => {
      //strictly for security, make sure the conversation exists
      const conversation = data.convoId && await Conversation.findConversationByPK(data.convoId);
      const otherUserSocket = conversation && clients[data.otherUserId];
      if (otherUserSocket) io.to(otherUserSocket).emit("mark-as-read", {
        convoToUpdate:data.convoId
      });
    });
  
    socket.on("logout", (id) => {
      if (onlineUsers.includes(id)) {
        userIndex = onlineUsers.indexOf(id);
        onlineUsers.splice(userIndex, 1);
        socket.broadcast.emit("remove-offline-user", id);
      }

    socket.on('disconnect', function() {
      deleteByValue(clients, socket.id);
    });
    }); 
  }); 

  //helper functions
  const sendMessageViaSocket = ({ convoData, senderId, messageData }) => {
    const otherUserId = senderId === convoData.user1Id ? convoData.user2Id : convoData.user1Id;
    const otherUserSocket = clients[otherUserId];
    if (otherUserSocket) io.to(otherUserSocket).emit("new-message", {
      message: messageData,
      sender: messageData.senderId,
    });
  }
  
  const deleteByValue = (clients,socketId) => {
    for(let id in clients) {
        if(clients.hasOwnProperty(id) && clients[id] == socketId) {
            delete clients[id];
        }
    }
  } 
}




