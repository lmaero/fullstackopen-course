const express = require('express');
const app = express();

app.use(express.json());

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

app.get('/info', (request, response) => {
  response.send(`
    <h1>Phonebook API Info</h1>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((person) => person.id === personId);
  console.log(person);

  if (person) response.json(person);
  else response.status(404).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Phonebook API running on port ${3001}`);
