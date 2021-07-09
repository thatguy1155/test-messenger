import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  markedAsRead
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const socket = io.connect('http://localhost:3001', {
  query: {token}
});
//const socket = io('http://localhost:3001');

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    console.log("online");
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("read", (data) => {
    store.dispatch(markedAsRead(data.convoToUpdate,'socket'));
  });
});

export default socket;
