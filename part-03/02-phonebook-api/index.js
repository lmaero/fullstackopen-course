const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('post-body', function (request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-body',
  ),
);

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
    return response
      .status(400)
      .json({ Error: 'You must provide a name and a number' })
      .end();

  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase(),
  );

  if (existingPerson)
    return response
      .status(400)
      .json({ Error: 'Name must be unique, person already exists' })
      .end();

  const newPerson = {
    name,
    number,
    id: generateRandomID(),
  };

  persons = persons.concat(newPerson);
  response.status(201).json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Phonebook API running on port ${3001}`);
});
