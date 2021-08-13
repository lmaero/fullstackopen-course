import React from "react";
import { CoursePart } from "../types/courseParts";

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Total;
