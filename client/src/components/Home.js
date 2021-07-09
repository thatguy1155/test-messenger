import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "97vh",
  },
}));


const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true)
    },[user.id])

  useEffect(() => {
    dispatch(fetchConversations())
    // eslint-disable-next-line
    },[])
  

  const handleLogout = async () => {
    await dispatch(logout(user.id));
    dispatch(clearOnLogout());
  };

  
  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
  
}

export default Home;
