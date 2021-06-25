import axios from 'axios';

const baseUrl = 'https://lmaero-fso-phonebook-api.herokuapp.com/api/persons';

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

function update(id, updatedPerson) {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
}

const personsService = { getAll, create, deletePerson, update };
export default personsService;
