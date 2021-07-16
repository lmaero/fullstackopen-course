const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const votedId = action.data.id;
      const votedAnecdote = state.find((a) => a.id === votedId);
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      const newAnecdotesArray = state.map((a) =>
        a.id === votedId ? updatedAnecdote : a
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: asObject(content),
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default reducer;
