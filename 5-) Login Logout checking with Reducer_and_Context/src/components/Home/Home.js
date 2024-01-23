import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import Button from "../UI/Button/Button";
import { Context1 } from "../store/Store";

const Home = () => {
  const iterate = useContext(Context1);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={iterate.logoutHandler}>Logut</Button>
    </Card>
  );
};

export default Home;
