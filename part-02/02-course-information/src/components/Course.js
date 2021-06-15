import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <Header courseName={course.name} />
        <Content courseParts={course.parts} />
        <Total courseParts={course.parts} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default Course;
