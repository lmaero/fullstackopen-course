import React from "react";
import { ContentProps } from "../types/courseParts";

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <React.StrictMode>
      <React.Fragment>
        {courseParts.map((coursePart, index) => (
          <p key={index}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Content;
