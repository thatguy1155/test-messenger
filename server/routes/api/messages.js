const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    
    //for security reasons, confirm that this conversation exists for sender
    let conversation = await Conversation.findConversationByPK(conversationId);
    const foundConvoId = conversation ? conversation.id : null;
    
    //if the belongs to these users, write the message
    if (conversationId && foundConvoId === conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
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
      }
    }
    const message = await Message.create({
      senderId,
      text,
      read:false,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
