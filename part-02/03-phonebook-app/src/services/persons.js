import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function create(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
}

function deletePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

const personsService = { getAll, create, deletePerson };
export default personsService;
