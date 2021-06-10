import React from 'react';

const Header = (props) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>{props.course}</h1>
      </React.Fragment>
    </React.StrictMode>
  );
};

const Part = (props) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

const Content = (props) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <Part part={props.part1} />
        <Part part={props.part2} />
        <Part part={props.part3} />
      </React.Fragment>
    </React.StrictMode>
  );
};

const Total = (props) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <p>
          Number of exercises{' '}
          {props.exercises1 + props.exercises2 + props.exercises3}
        </p>
      </React.Fragment>
    </React.StrictMode>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <React.StrictMode>
      <React.Fragment>
        <Header course={course} />

        <Content part1={part1} part2={part2} part3={part3} />

        <Total
          exercises1={part1.exercises}
          exercises2={part2.exercises}
          exercises3={part3.exercises}
        />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
