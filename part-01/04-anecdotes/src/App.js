import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);

  //WITH OBJECTS
  const [votes, setVotes] = useState({});

  /* 
  WITH ARRAYS
  const zeroFilledVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(zeroFilledVotes); 
  */

  function generateRandom(length) {
    let randomNumber = Math.floor(Math.random() * length);

    if (randomNumber === selected) {
      randomNumber = generateRandom(length);
      return randomNumber;
    }

    return randomNumber;
  }

  function increaseVote() {
    //WITH OBJECTS
    const votesCopy = { ...votes };

    if (isNaN(votesCopy[selected])) votesCopy[selected] = 0;

    votesCopy[selected] += 1;
    setVotes(votesCopy);

    /* 
    WITH ARRAYS
    const votesCopy = [...votes];

    if (isNaN(votesCopy[selected])) votesCopy[selected] = 0;

    votesCopy[selected] += 1;
    setVotes(votesCopy);
    */
  }

  function indexOfMostVoted() {
    // WITH OBJECTS
    const mostVoted = Math.max(...Object.values(votes));
    return Object.keys(votes).find((key) => votes[key] === mostVoted);

    /*
    WITH ARRAYS
    return votes.indexOf(Math.max(...votes));
    */
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Anecdotes</h1>

        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {isNaN(votes[selected]) ? 0 : votes[selected]} votes</p>

        <button onClick={increaseVote}>vote</button>

        <button onClick={() => setSelected(generateRandom(anecdotes.length))}>
          next anecdote
        </button>

        <h2>Anecdote with most votes</h2>
        {/* WITH OBJECTS */}
        <p>{anecdotes[indexOfMostVoted()]}</p>
        <p>
          {votes[indexOfMostVoted()] === undefined
            ? 'All anecdotes have 0 votes'
            : `has ${votes[indexOfMostVoted()]} votes`}
        </p>

        {/*
        WITH ARRAYS

        <p>{anecdotes[indexOfMostVoted()]}</p>
        <p>has {votes[indexOfMostVoted()]} votes</p>
        */}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
