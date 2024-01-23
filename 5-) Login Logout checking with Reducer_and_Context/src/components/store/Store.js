import React, { useEffect, useState } from "react";

export const Context1 = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  loginHandler: () => {},
  logoutHandler: () => {},
});

export const Store = (props) => {
  //try export default
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("statusLogin", 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("statusLogin");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("statusLogin") === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Context1.Provider
        value={{ isLoggedIn, setIsLoggedIn, loginHandler, logoutHandler }}
      >
        <div>{props.children}</div>
      </Context1.Provider>
    </>
  );
};
