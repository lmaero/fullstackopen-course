import React from "react";
import { HeaderProps } from "../types/courseName";

const Header = (props: HeaderProps) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>{props.courseName}</h1>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Header;
