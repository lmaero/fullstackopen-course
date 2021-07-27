import React from 'react';
import { Link } from 'react-router-dom';
import LoggedUserInfo from './LoggedUserInfo';

const Menu = () => {
  const linkStyle = {
    marginRight: '2em',
  };

  const menuStyle = {
    alignItems: 'center',
    backgroundColor: '#eee',
    display: 'flex',
    padding: '0.5em 2em',
  };

  return (
    <React.StrictMode>
      <>
        <nav style={menuStyle}>
          <Link style={linkStyle} to="/">Blogs</Link>
          <Link style={linkStyle} to="/users">Users</Link>
          <LoggedUserInfo />
        </nav>
      </>
    </React.StrictMode>
  );
};

export default Menu;
