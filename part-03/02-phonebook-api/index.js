require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

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

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
      <h1>Phonebook API Info</h1>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      `);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const personId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== personId);

  response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
  const { name, number, id } = request.body;
  console.log(request.body);

  if (!name || !number) {
    console.log(`Name: ${name} Number: ${number}`);
    return response
      .status(400)
      .json({ Error: 'You must provide a name and a number' });
  }

  if (Person.findById(id)) {
    console.log(`My person to update is: ${name}`);
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Phonebook API running on port ${PORT}`);
});
