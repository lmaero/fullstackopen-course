import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (
          n.id !== id
            ? n
            : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`,
        );
        setTimeout(() => { setErrorMessage(null); }, 5000);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loggedUser),
      );

      setErrorMessage(`Successfully logged in as ${username}`);
      setTimeout(() => { setErrorMessage(null); }, 5000);

      noteService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => { setErrorMessage(null); }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    setErrorMessage('Successfully logged out');
    setTimeout(() => { setErrorMessage(null); }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        {'username '}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        {'password '}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />

      <button type="submit">save</button>
    </form>
  );

  return (
    <React.StrictMode>
      <>
        <div>
          <h1>Notes</h1>
          <Notification message={errorMessage} />

          {user === null
            ? loginForm()
            : (
              <div>
                <p>{`${user.name} logged-in`}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                >
                  log out
                </button>
                {noteForm()}
              </div>
            ) }

          <div>
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
            >
              {`Show ${showAll ? 'important' : 'all'}`}
            </button>
          </div>

          <ul>
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </ul>
        </div>

        <Footer />
      </>
    </React.StrictMode>
  );
};

export default App;