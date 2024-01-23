import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { Context1 } from "../store/Store";
import Inputs from "./Inputs";

const ACTION = {
  INPUT_CHANGE: "input_change",
  INPUT_ISVALID: "input_isValid",
};

const reducerEmail = (emailState, action) => {
  switch (action.type) {
    case ACTION.INPUT_CHANGE: {
      return {
        value: action.Payload.value1,
        isValid: action.Payload.value1.includes("@"),
      };
    }
    case ACTION.INPUT_ISVALID: {
      return {
        value: emailState.value,
        isValid: emailState.value.includes("@"),
      };
    }
    default:
      return { value: "", isValid: false };
  }
};

const reducerPassword = (passwordState, action) => {
  switch (action.type) {
    case ACTION.INPUT_CHANGE:
      return {
        value: action.Payload.value2,
        isValid: action.Payload.value2.trim().length > 6,
      };
    case ACTION.INPUT_ISVALID:
      return {
        value: passwordState.value,
        isValid: passwordState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: false };
  }
};

const Login = () => {
  const ctx = useContext(Context1);

  const [emailState, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(reducerPassword, {
    value: "",
    isValid: null,
  });

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: ACTION.INPUT_CHANGE,
      Payload: { value1: event.target.value },
    });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: ACTION.INPUT_CHANGE,
      Payload: { value2: event.target.value },
    });
  };

  const onBlurHandlerEmail = () => {
    dispatchEmail({ type: ACTION.INPUT_ISVALID });
  };
  const onBlurHandlerPassword = () => {
    dispatchPassword({ type: ACTION.INPUT_ISVALID });
  };

  const { isValid: forEmailValid } = emailState;
  const { isValid: forpasswordValid } = passwordState;

  useEffect(() => {
    console.log("time1");

    const timeoutID = setTimeout(() => {
      console.log("time2");
      setFormIsValid(forEmailValid && forpasswordValid);
    }, 100);

    return () => {
      console.log("returnPart");
      clearTimeout(timeoutID);
    };
  }, [forEmailValid, forpasswordValid]);

  // const validatePasswordHandler = () => {
  //   // setPasswordIsValid(enteredPassword.trim().length > 6);
  //   dispatchPassword({ type: ACTION.INPUT_ISVALID });
  // };

  // const validateEmailHandler = () => {
  //   dispatchEmail({ type: ACTION.INPUT_ISVALID });
  //   // setEmailIsValid(emailState.value.includes("@"));
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if (forEmailValid && forpasswordValid) {
      ctx.loginHandler(emailState.value, passwordState.value);
    } else if (!forEmailValid) {
      emailRef.current.focus1();
    } else {
      passwordRef.current.focus1();
    }
  };
  console.log(emailRef);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Inputs
          StateType={emailState}
          htmlfor="email"
          typ="email"
          idd="email"
          ChangeHandler={emailChangeHandler}
          onBlur={onBlurHandlerEmail}
          text="E-mail"
          ref={emailRef}
        />

        <Inputs
          StateType={passwordState}
          htmlfor="password"
          typ="password"
          idd="password"
          ChangeHandler={passwordChangeHandler}
          onBlur={onBlurHandlerPassword}
          text="Password"
          ref={passwordRef}
        />

        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            // onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
          />
        </div> */}

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
