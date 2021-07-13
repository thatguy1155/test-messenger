const router = require("express").Router();
// const { app } = require("../../app");
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  const user = await req.user;
  try {
    if (!user) {
      return res.sendStatus(401);
    }
    const senderId = user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    //if user isn't online, set message as initually unread
    let read = onlineUsers.includes(recipientId);
    
    //for security reasons, confirm that this conversation exists for sender
    let conversation = conversationId && await Conversation.findConversationByPK(conversationId);
    const foundConvoId = conversation ? conversation.id : null;
    
    //if the belongs to these users, write the message
    if (conversationId && foundConvoId === conversationId) {
      const message = await Message.create({ senderId, text, read, conversationId });
      return res.json({ message, sender });
    }

    //possible foul play return unauthorized
    if (conversationId && foundConvoId !== conversationId) {
      return res.sendStatus(401);
    }

    //if there's no conversationId, check to see if there's a conversation 
    //between users.
    conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
        read = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      read,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/read", async (req, res, next) => {
  try {
    const user = await req.user
    const userId = user.dataValues.id;
    const { id } = await req.body;
    const convoMatch = id && await Conversation.findConversationByPK(id);
    if (!convoMatch){
      return res.sendStatus(204);
    }
    const inConvo = convoMatch.dataValues.user1Id === userId || convoMatch.dataValues.user2Id === userId
    if (!user || !inConvo) {
      return res.sendStatus(401);
    }
    

    await Message.readMessages({ conversationId:id, userId, res });
    const conversation = await Conversation.findConversationByPK(id);
    
    return conversation ? res.json({ conversation }) : res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
