import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: "100%",
    paddingLeft:3,
    paddingRight:3,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 12,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  //TODO: center this notifiation vertically
  notificationWrapper: {
    height:40,
    width:40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadByYou } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadByYou > 0 &&
        <Box className={classes.notificationWrapper}>
          <Typography className={classes.notification}>
            {unreadByYou && unreadByYou}
          </Typography>
        </Box>
      }
      
      
    </Box>
  );
};

export default ChatContent;
