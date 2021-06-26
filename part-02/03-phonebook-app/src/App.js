import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  function verifyExistence() {
    return persons.find((p) => p.name.toLowerCase() === newName.toLowerCase());
  }

  function updatePerson(originalPerson) {
    const personObject = { ...originalPerson, number: newNumber };

    personsService
      .update(originalPerson.id, personObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
        );
        showNotification(`Updated ${returnedPerson.name}`, 'success');
      })
      .catch((error) => showNotification(error.response.data.error, 'error'));

    setNewName('');
    setNewNumber('');
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingContact = verifyExistence();

    if (existingContact) {
      const isUpdateConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number?`,
      );
      return isUpdateConfirmed
        ? updatePerson(existingContact)
        : showNotification('Action canceled by user', 'error');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`, 'success');
        })
        .catch((error) => showNotification(error.response.data.error, 'error'));
    }
  };

  const deletePerson = (person) => {
    const isConfirmed = window.confirm(`Delete ${person.name}?`);
    if (isConfirmed) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => (p.id === person.id ? null : p)));
          showNotification(`Deleted ${person.name}`, 'error');
        })
        .catch(() => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            'error',
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    } else {
      showNotification('Deletion canceled by user', 'error');
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

  function showNotification(message, type) {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  }

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Phonebook App</h1>
        <Notification message={notificationMessage} type={notificationType} />

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
