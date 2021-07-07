

//helper functions for reorderConversations
export const reorderMessages = (messages) => {
  return messages.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
}

export const unreadByYou = (messages,otherUserId) => messages.filter((message) => {
  const senderId = message.senderId;
  return !message.read && senderId === otherUserId; 
}).length

export const lastReadByThem = (messages, otherUserId) => {
  const lastReadId = Math.max.apply(Math, readByOther(messages,otherUserId));
  return lastReadId;
}

const readByOther = (messages,otherUserId) => messages.map((message) => {
  const senderId = message.senderId;
  const readByOtherUser = message.read && senderId !== otherUserId;
  return readByOtherUser ? message.id : -1;
})



//helper functions for updateMessagesInStore
export const setMessageToRead = (messages) => {
  const readMessages = messages.map((message) => {
    const messageCopy = message;
    messageCopy.read = true;
    return messageCopy;
  })
  return readMessages
}