import React from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  // console.log('Hello from component');
  /* const now = new Date();
  const a = 10;
  const b = 20; */

  const name = 'Peter';
  const age = 10;

  return (
    <div>
      {/* <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p> */}

      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};

export default App;
