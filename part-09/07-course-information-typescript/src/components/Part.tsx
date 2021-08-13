import React from "react";
import { CoursePart } from "../types/courseParts";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function courseToRender(part: CoursePart) {
  switch (part.type) {
    case "normal":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>
            <em>{part.description}</em>
          </p>
        </>
      );
    case "groupProject":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>
            <em>Project exercises: {part.groupProjectCount}</em>
          </p>
        </>
      );
    case "submission":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            <em>Submit to: {part.exerciseSubmissionLink}</em>
          </p>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>
            <em>{part.description}</em>
          </p>
          <p>
            Required skills:{" "}
            {part.requirements.map((r, index) => {
              const rsLength = part.requirements.length;
              return index === rsLength - 1 ? r : r + ", ";
            })}
          </p>
        </>
      );
    default:
      return assertNever(part);
  }
}

const Part = ({ part }: { part: CoursePart }) => {
  return <React.Fragment>{courseToRender(part)}</React.Fragment>;
};

export default Part;
