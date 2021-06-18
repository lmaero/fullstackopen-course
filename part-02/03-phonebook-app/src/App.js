import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

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

      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const deletePerson = (person) => {
    const isConfirmed = window.confirm(`Delete ${person.name}?`);
    if (isConfirmed)
      personsService
        .deletePerson(person.id)
        .then(() =>
          setPersons(persons.filter((p) => (p.id === person.id ? null : p))),
        );
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
        <Persons
          filterNumbersList={filterNumbersList}
          deletePerson={deletePerson}
        />
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
