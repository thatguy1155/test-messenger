const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { id } = req.body;
    await Message.readMessages(id);
    let conversation = await Conversation.findConversationByPK(id);
    return res.json({ conversation });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
