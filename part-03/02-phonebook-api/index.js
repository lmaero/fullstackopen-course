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

app.post('/api/persons/', (request, response, next) => {
  const { name, number, id } = request.body;

  if (!name || !number) {
    return response
      .status(400)
      .json({ Error: 'You must provide a name and a number' });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.status(200).send(`
      <h1>Phonebook API Info</h1>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      `);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const { name, number } = request.body;
  const updatedPerson = {
    name,
    number,
  };

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((returnedPerson) => response.status(200).json(returnedPerson))
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed ID' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Phonebook API running on port ${PORT}`);
});
