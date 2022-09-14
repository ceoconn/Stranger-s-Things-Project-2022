import React, { useState } from 'react';
import { loginUser } from '../api';
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
      console.log(results.error.message)
    }
  }
  
  return (
    <form id='log-in' onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>
      <TextField 
        type='text'
        placeholder='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        type='password'
        placeholder='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant='outlined' type='submit'>Sign in</Button>
      <p className={ !error ? 'hidden' : 'error'}>
        Incorrect username or password, please try again, or try signing up instead
        </p>
    </form>
  )
}

export default Login;