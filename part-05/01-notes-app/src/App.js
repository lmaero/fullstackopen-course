import React, { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
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

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
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
                <p>{`${user.name} logged in`}</p>
                {noteForm()}
              </div>
            )}

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
