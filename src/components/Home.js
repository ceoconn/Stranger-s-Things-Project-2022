import React from 'react';
import { Link } from 'react-router-dom';
import alien from './alien-outline.jpg';

const Home = ({ token }) => {
  return (
    <>
    <div>
      <h1>Welcome to Stranger's Things!</h1>
      {
        token ? (
          <button>
            <Link to='/posts/create-post'>Create a New Listing</Link>
          </button>
        ) : <p>This site is the best place to buy and sell used goods from your fellow humans!</p>
      }

    </div>
    <div id='img'>
      <img src={alien} alt="alien-peace-sign"/>
    </div>
    </>
    
  )
}

export default Home;