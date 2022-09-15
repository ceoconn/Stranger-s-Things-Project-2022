import React, { useState } from 'react';
import { loginUser } from '../api';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const Login = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const results = await loginUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/profile');
    } else {
      setError(true);
      console.log('LOGIN FAIL', results.error.message)
    }
  }

  return (
    <form id='log-in' onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
      setError(false)
    }}>
      <TextField
        type='text'
        label='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        type='password'
        label='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant='outlined' type='submit'>Sign in</Button>

      <Link to='/register'>Don't have an account? Sign up</Link>
      <p className={!error ? 'hidden' : 'error'}>
        Incorrect username or password
      </p>
    </form>
  )
}

export default Login;