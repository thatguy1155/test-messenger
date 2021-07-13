const router = require("express").Router();
const { User } = require("../../db/models");
const { Op } = require("sequelize");
const OnlineUsers = require("../../onlineUsers");

// find users by username
router.get("/:username", async (req, res, next) => {
  const user = await req.user;
  try {
    if (!user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: user.id,
        },
      },
    });

    // add online status to each user that is online
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      if (OnlineUsers.contains(userJSON.id)) {
        userJSON.online = true;
      }
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
