import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => (
  <React.Fragment>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </React.Fragment>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <React.Fragment>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={`${positive} %`} />
        </tbody>
      </table>
    </React.Fragment>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Unicafe</h1>

        <h2>give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />

        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
