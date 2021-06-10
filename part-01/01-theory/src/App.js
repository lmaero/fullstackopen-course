import React, { useState } from 'react';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // console.log('Hello from component');
  /* const now = new Date();
  const a = 10;
  const b = 20; */

  const name = 'Peter';
  const age = 10;

  const [counter, setCounter] = useState(0);

  // setTimeout(() => setCounter(counter + 1), 1000);

  /* const handleClick = () => {
    console.log('clicked');
  }; */

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      {/* <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p> */}

      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />

      <Display counter={counter} />
      {/* <button onClick={handleClick}>plus</button> */}
      <Button handleClick={increaseByOne} text='plus' />
      <Button handleClick={decreaseByOne} text='minus' />
      <Button handleClick={setToZero} text='zero' />
    </div>
  );
};

export default App;
