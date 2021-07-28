import React from 'react';
import { Link } from 'react-router-dom';
import LoggedUserInfo from './LoggedUserInfo';

const navStyle = 'grid grid-cols-nav max-w-full mx-auto shadow-md items-center';
const linkStyle = 'text-green-700 font-medium hover:text-green-400 transform hover:scale-125 transition duration-300 justify-self-center p-4';
const logoStyle = 'font-bold text-black text-xl ml-5';

const Menu = () => (
  <React.StrictMode>
    <>
      <nav className={navStyle}>
        <Link to="/">
          <h1 className={logoStyle}>
            Blogs App
          </h1>

        </Link>
        <Link className={linkStyle} to="/">Blogs</Link>
        <Link className={linkStyle} to="/users">Users</Link>
        <LoggedUserInfo />
      </nav>
    </>
  </React.StrictMode>
);

export default Menu;
