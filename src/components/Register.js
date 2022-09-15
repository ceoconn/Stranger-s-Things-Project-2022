import React, { useState } from 'react';
import { registerUser } from '../api';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Register = ({ setToken, navigate }) => {
  // props.setToken
  // const {setToken} = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const results = await registerUser(username, password);
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
    <form id='register'
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
      <TextField
        type='text'
        label='Create Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        type='password'
        label='Create Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button variant='outlined' type='submit'>Sign up</Button>
      <p className={ !error ? 'hidden' : 'error'}>
        Whoops! Those credentials already exist, try <Link to='/login'>signing in</Link> instead, or make up something else!
        </p>
    </form>
  )
}

export default Register;