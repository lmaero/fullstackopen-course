import React from 'react';

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <React.StrictMode>
      <React.Fragment>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
      </React.Fragment>
    </React.StrictMode>
  );
};

export default PersonForm;
