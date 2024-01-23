import React, { useContext, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import { Context1 } from "./components/store/Store";

function App() {
  const { isLoggedIn, setIsLoggedIn, loginHandler, logoutHandler } =
    useContext(Context1);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
