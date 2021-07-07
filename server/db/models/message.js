const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Message.readMessages = async function (conversationId) {
  const messages = await Message.update({read:true},{
    where: { conversationId }
  });
  if (!messages) throw ('Error while Updating');
  // return conversation or null if it doesn't exist
};

module.exports = Message;
