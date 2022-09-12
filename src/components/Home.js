import React from 'react';
import { Link } from 'react-router-dom';
import alien from './alien-face.jpg';
import { Button } from '@mui/material';

const Home = ({ token, user }) => {
  return (
    <>
    <div id="welcome-text">
      <h1 id='title'>Welcome to Stranger's Things!</h1>
      {
        token ? (
          <div>
          <p className='home-greeting'>Don't worry, {user.username}. Not all strangers are dangerous</p>
          <Button variant='contained' id="cp-button">
            <Link to='/posts/create-post' style={{textDecoration:'none', color:'white'}} >Create a New Listing</Link>
          </Button>
          </div>
        ) : <p className='home-greeting'>This site is the best place to buy and sell used goods from your fellow humans!</p>
      }

    </div>
    <div id='img'>
      <img src={alien} alt="alien-peace-sign"/>
    </div>
    </>
    
  )
}

export default Home;