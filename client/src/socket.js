import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  markedAsRead
} from "./store/conversations";


const socket = io('http://localhost:3001');

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    console.log("fuck")
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("mark-as-read", (data) => {
    store.dispatch(markedAsRead(data.convoToUpdate,'socket'));
  });
});

export default socket;
