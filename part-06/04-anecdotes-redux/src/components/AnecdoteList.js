import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  function handleVote() {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        {`Has ${anecdote.votes} `}
        <button onClick={handleVote}>Vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes;
    }

    const filteredList = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredList;
  });

  console.log(anecdotes);

  return (
    <React.StrictMode>
      <React.Fragment>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <Anecdote anecdote={anecdote} key={anecdote.id} />
          ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default AnecdoteList;
