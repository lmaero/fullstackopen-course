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
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </React.Fragment>
    </React.StrictMode>
  );
};

const Total = (props) => {
  // acc = accumulator, curr = current
  const total = props.parts.reduce((acc, curr) => (acc += curr.exercises), 0);

  return (
    <React.StrictMode>
      <React.Fragment>
        <p>Number of exercises {total}</p>
      </React.Fragment>
    </React.StrictMode>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <React.StrictMode>
      <React.Fragment>
        <Header course={course} />

        <Content parts={parts} />

        <Total parts={parts} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
