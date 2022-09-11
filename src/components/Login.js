import React, { useState } from 'react';
import { loginUser } from '../api';

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
      <input 
        type='text'
        placeholder='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input 
        type='password'
        placeholder='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit'>Sign in</button>
      <p className={ !error ? 'hidden' : 'error'}>
        Incorrect username or password, please try again
        </p>
    </form>
  )
}

export default Login;