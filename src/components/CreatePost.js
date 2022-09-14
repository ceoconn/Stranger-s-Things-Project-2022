import React, { useState } from 'react';
import { createPost } from '../api';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Switch } from '@mui/material';

const CreatePost = ({ token, fetchPosts, navigate }) => {

  const { postID } = useParams();
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createPrice, setCreatePrice] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createWillDeliver, setWillDeliver] = useState(false);

  async function addPost() {

    const newPost = {
      token: token,
      title: createTitle,
      description: createDescription,
      location: createLocation,
      price: createPrice,
      willDeliver: createWillDeliver,
      _id: postID
    }

    await createPost(token, newPost)
    fetchPosts();
    navigate('/listing')
    alert('Your post was successfully created!')
  }

  return (
    <div id='post-form'>
      <form>
        <p>Item:</p>
        <input
          type='text'
          placeholder='Name of Item'
          onChange={(e) => setCreateTitle(e.target.value)}
        />
        <p>Description:</p>
        <input
          type='text'
          placeholder='What is it?'
          onChange={(e) => setCreateDescription(e.target.value)}
        />
        <p>Price:</p>
        <input
          type='text'
          placeholder='How much?'
          onChange={(e) => setCreatePrice(e.target.value)}
        />
        <p>Location:</p>
        <input
          type='text'
          placeholder='Where are you selling from?'
          onChange={(e) => setCreateLocation(e.target.value)}
        />
        <p>Are You Willing to Deliver the Item? (Only check if yes!)</p>
        <Switch
          onChange={(e) => {
            e.preventDefault()
            { e.target.checked ? setWillDeliver(true) : setWillDeliver(false) }
          }} />

      </form>

      <Button variant='contained' onClick={() => addPost()}>Create Listing</Button>
    </div>

  )
}

export default CreatePost;