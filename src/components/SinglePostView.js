import { useRadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMessage } from '../api';
import { Paper } from '@mui/material';

const SendMessage = ({ postID, token }) => {
  const [message, setMessage] = useState({content: ''});
  // we need 3 things to make this request
    // Post-id, token, message object containing the content of the message
    
  async function addMessage() {
    await createMessage({postID, message, token})
  }
  
  return (
    <form onSubmit={ (ev)=> {
      ev.preventDefault();
      addMessage();
    }}>
      <input
        type='text'
        placeholder='Enter Message'
        onChange={ (ev) => setMessage({content: ev.target.value}) }
      />
      <button type='submit'>Send Message</button>
    </form>
  )
}

const SinglePostView = ({ posts, token }) => {
  const [activateMessage, setActivateMessage] = useState(false);
  
  const { postID } = useParams();
  
  const [currentPost] = posts.filter(post => post._id === postID);
  
  const {title, description, location, price, willDeliver} = currentPost;
  
  return (
    <Paper id='single-card-view' elevation='4'>
      <div id='inner-card-div'>
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Location: {location}</p>
        <p>Will Deliver: {`${willDeliver}`}</p>
      </div>
      <button onClick={() => setActivateMessage(!activateMessage)}>Message this user</button>
      {
        activateMessage && <SendMessage postID={postID} token={token}/>
      }
    </Paper>
  )
}

export default SinglePostView;