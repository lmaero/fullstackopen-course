import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const increaseVote = async (id, originalObject) => {
  const newObject = { ...originalObject, votes: originalObject.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const anecdoteService = {
  getAll,
  createNew,
  increaseVote,
};

export default anecdoteService;
