import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data;
      const newAnecdotesArray = state.map((a) =>
        a.id === votedAnecdote.id ? votedAnecdote : a
      );

      return newAnecdotesArray;

    case 'ADD_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      break;
  }

  return state;
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const toUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.increaseVote(toUpdate);

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
