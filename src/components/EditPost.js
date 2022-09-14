import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deletePost, updatePost } from '../api';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Switch } from '@mui/material';

const EditPost = ({ posts, token, navigate}) => {
  const { postID } = useParams();

  const [currentPost] = posts.filter(post => post._id === postID);

  const { title, description, location, price, willDeliver } = currentPost;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDesc] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newPrice, setNewPrice] = useState(price);
  const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

  async function editPost() {
    const updatedPost = {
      token: token,
      title: newTitle,
      description: newDescription,
      location: newLocation,
      price: newPrice,
      willDeliver: newWillDeliver,
      _id: postID
    }
    await updatePost(updatedPost)
    navigate('/listing')
    alert('Your post was successfully updated!')
  }

  // const oldPost = currentPost

  // async function handleDelete() {
  //   const results = await deletePost(token, oldPost)
  //   fetchPosts();
  //   navigate('/listing')
  // }

  return (
    <form id='edit-form' onSubmit={(ev) => {
      ev.preventDefault();
      editPost();

    }}>
      <p>Current item name: {title}</p>
      <TextField
        type='text'
        placeholder='Edited name'
        onChange={(ev) => setNewTitle(ev.target.value)}
      />
      <p>Current Description of Item: {description}</p>
      <TextField
        type='text'
        placeholder='Edited description'
        onChange={(ev) => setNewDesc(ev.target.value)}
      />
      <p>Current Seller Location: {location}</p>
      <TextField
        type='text'
        placeholder='Edited location'
        onChange={(ev) => setNewLocation(ev.target.value)}
      />
      <p>Current Price Being Sold for: {price}</p>
      <TextField
        type='text'
        placeholder='Edited price (in dollars)'
        onChange={(ev) => setNewPrice(ev.target.value)}
      />
      <p>Would you like to change if you are able to deliver? (currently {`${willDeliver}`})</p>
      <Switch
        type='checkbox'
        checked={newWillDeliver}
        onChange={(ev) => setNewWillDeliver(ev.target.checked)}
      />
      <Button variant='outlined'
        type='submit'
        style={{ marginBottom: '2rem' }}>
        Save Edits
      </Button>
      <Button variant='contained' color='secondary' onClick={() => {
        console.log('POST_ID:', currentPost._id, 'TOKEN:', token)
        deletePost(token, currentPost._id);
        // fetchPosts();
        // navigate('/listing');
      }}>Delete this Listing</Button>
    </form>
  )
}

export default EditPost;