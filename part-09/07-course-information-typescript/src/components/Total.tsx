import React from "react";
import { ContentProps } from "../types/courseParts";

const Total = (props: ContentProps) => {
  const { courseParts } = props;

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
