import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
}

export default blogService
