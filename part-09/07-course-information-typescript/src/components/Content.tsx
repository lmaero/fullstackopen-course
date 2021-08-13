import React from "react";
import { CoursePart } from "../types/courseParts";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <React.Fragment>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </React.Fragment>
  );
};

export default Content;
