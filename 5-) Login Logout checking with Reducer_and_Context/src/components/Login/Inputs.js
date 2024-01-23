import React, { useRef, useImperativeHandle } from "react";
import classes from "./Login.module.css";

const Inputs = React.forwardRef((props, ref) => {
  const refOne = useRef();

  const activeOne = () => {
    console.log("in holee");
    refOne.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus1: activeOne,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.StateType.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlfor}>{props.text}</label>
      <input
        type={props.typ}
        id={props.idd}
        value={props.StateType.value}
        onChange={props.ChangeHandler}
        onBlur={props.onBlur}
        ref={refOne}
      />
    </div>
  );
});

export default Inputs;
