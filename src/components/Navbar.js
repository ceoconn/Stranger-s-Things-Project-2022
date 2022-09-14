import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
  return (
    <header>
      <nav id='nav'>
        <Link to='/'>Home</Link>
        <Link to='/listing'>Listings</Link>
        {
          token ? (
            <Link to='/profile'>Profile</Link>
          ) : null
        }
        {
          token ? (
            <Link id='log-out' to='/' onClick={() => logout()}>Logout</Link>
          ) : (
            <>
              <Link to='/register'>Sign up</Link>
              <Link to='/login'>Sign in</Link>
            </>
          )
        }
      </nav>
      
    </header>
  )
}

export default Navbar;