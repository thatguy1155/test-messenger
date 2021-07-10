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
    paddingLeft:theme.spacing,
    paddingRight:theme.spacing,
    backgroundColor: "#3F92FF",
    marginRight: theme.spacing,
    color: "white",
    fontSize: theme.typography,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

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

  const Unread = () => {
    if (unreadByYou) {
      return (
      <Box className={classes.notificationWrapper}>
          <Typography className={classes.notification}>
            {unreadByYou}
          </Typography>
      </Box>
      );
    } else return null;
  }

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
      <Unread />
    </Box>
  );
};

export default ChatContent;
