const onlineUsers = require("./onlineUsers");

module.exports = (io) => {
  
  io.on("connection", (socket) => {
    console.log("connected")
    socket.on("go-online", (id) => {
      if (!onlineUsers.includes(id)) {
        onlineUsers.push(id);
      }
      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });
  
    socket.on("new-message", (data) => {
      socket.broadcast.emit("new-message", {
        message: data.message,
        sender: data.sender,
      });
  
    });
    
    socket.on("mark-as-read", (data) => {
      socket.broadcast.emit("mark-as-read", {
        convoToUpdate:data.convoId
      });
    });
  
    socket.on("logout", (id) => {
      if (onlineUsers.includes(id)) {
        userIndex = onlineUsers.indexOf(id);
        onlineUsers.splice(userIndex, 1);
        socket.broadcast.emit("remove-offline-user", id);
      }
    }); 
  });  
}