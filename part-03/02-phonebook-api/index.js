const express = require('express');
const app = express();

app.use(express.json());

let persons = [
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

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== personId);

  response.status(204).end();
});

function generateRandomID() {
  return Math.floor(Math.random() * 100_000_000);
}

app.post('/api/persons/', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number)
    response
      .status(400)
      .json({ Error: 'You must provide a name and a number' });
  else {
    const newPerson = {
      name,
      number,
      id: generateRandomID(),
    };

    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Phonebook API running on port ${3001}`);
