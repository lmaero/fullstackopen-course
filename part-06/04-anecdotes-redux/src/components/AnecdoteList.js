import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
          vote
        </button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

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
