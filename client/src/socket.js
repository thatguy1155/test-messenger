import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  markedAsRead
} from "./store/conversations";
// 'http://localhost:3001'
const token = localStorage.getItem("messenger-token");
const socket = io.connect(process.env.REACT_APP_BACKEND_SERVER, {
  query: {token}
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("mark-as-read", (data) => {
    store.dispatch(markedAsRead(data.convoToUpdate,'socket'));
  });
});

export default socket;
