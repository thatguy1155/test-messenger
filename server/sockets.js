const onlineUsers = require("./onlineUsers");

module.exports = {
  newMessageEmit: ({ socket, message, sender }) => {
    if (socket) { 
      socket.broadcast.emit("message", {
        message,
        sender,
      });
    }
  },
  setReadEmit: ({ socket, convoToUpdate }) => {
    if (socket) { 
      socket.broadcast.emit("read", { convoToUpdate });
    }
  },
  addOnlineUserEmit: ({ socket, id }) => {
    if (!onlineUsers.includes(id)) {
      onlineUsers.push(id);
    }
    // send the user who just went online to everyone else who is already online
    socket.broadcast.emit("add-online-user", id);
  },
  removeOnlineUserEmit: ({ socket, id }) => { 
    if (socket && onlineUsers.includes(id)) {
      userIndex = onlineUsers.indexOf(id);
      onlineUsers.splice(userIndex, 1);
      socket.broadcast.emit("remove-offline-user", id);
    }
  }
};