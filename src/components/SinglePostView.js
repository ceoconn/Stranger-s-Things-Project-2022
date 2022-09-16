import { useRadioGroup } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createMessage } from '../api';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const SendMessage = ({ postID, token }) => {
  const [message, setMessage] = useState({ content: '' });
  // we need 3 things to make this request
  // Post-id, token, message object containing the content of the message

const [sent, setSent] = useState(false)

  async function addMessage() {
    await createMessage({ postID, message, token })
    setSent(true)
  }


  return (

    token ? (
      <form id='msg-form' onSubmit={(ev) => {
        ev.preventDefault();
        addMessage();
       
      }}>
        <TextField
          type='text'
          label='Enter Message'
          onChange={(ev) => setMessage({ content: ev.target.value })}
        />
        <Button className={sent ? 'hidden' : 'message-form-button'} variant='contained' type='submit' style={{marginTop:'0.8vh'}}>Send Message</Button>
        <p className={sent ? 'sent-alert' : 'hidden'}>Your message was sent!</p>
      </form>
     
    ) : (
      <p id='msg-sign-in'>
        You must be  <Link to='/login'> signed in </Link>  to send messages
      </p>

    )

  )

}

const SinglePostView = ({ posts, token }) => {
  const [activateMessage, setActivateMessage] = useState(false);

  const { postID } = useParams();

  const [currentPost] = posts.filter(post => post._id === postID);

  const { title, description, location, price, willDeliver } = currentPost;

  return (
    
    <Paper id='single-card-view' elevation={4}>
      <div id='inner-card-div'>
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Location: {location}</p>
        <p>Will Deliver: {willDeliver ? 'yes' : 'no'}</p>
      </div>
      <Button variant='outlined' onClick={() => setActivateMessage(!activateMessage)}>Message this user</Button>
      {
        activateMessage && <SendMessage postID={postID} token={token} />
      }
      <Button id='return-button' variant='text'><Link to='/listing' style={{textDecoration:'none'}}>Back to All Listings</Link></Button>
    </Paper>
      
  )
}

export default SinglePostView;