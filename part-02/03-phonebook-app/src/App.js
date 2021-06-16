import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const isExistingContact = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (isExistingContact) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  function filterNumbersList() {
    if (filter) {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    return persons;
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Phonebook App</h1>

        <Filter filter={filter} handleFilterChange={handleFilterChange} />

        <h2>Phonebook</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />

        <h2>Numbers</h2>
        <Persons filterNumbersList={filterNumbersList} />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;