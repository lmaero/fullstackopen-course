import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <React.StrictMode>
      <React.Fragment>
        <h1>Phonebook App</h1>

        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name:{' '}
            <input autoFocus value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number:{' '}
            <input autoFocus value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>

        <h2>Numbers</h2>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </React.Fragment>
    </React.StrictMode>
  );
};

export default App;
