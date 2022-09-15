import React, { useState } from 'react';
import { createPost } from '../api';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
// import Snackbar from '@mui/material/Snackbar';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';

const CreatePost = ({ token, fetchPosts, navigate }) => {

  const { postID } = useParams();
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createPrice, setCreatePrice] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [createWillDeliver, setWillDeliver] = useState(false);


  // const [open, setOpen] = useState(false);

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
    // setOpen(true)
    alert('Your post was successfully created!')
    navigate('/listing')

  }


  return (
    <div id='post-form'>
      <form>
        <p>Item:</p>
        <TextField
          type='text'
          placeholder='Name of Item'
          onChange={(e) => setCreateTitle(e.target.value)}
        />
        <p>Description:</p>
        <TextField
          type='text'
          placeholder='What is it?'
          onChange={(e) => setCreateDescription(e.target.value)}
        />
        <p>Price:</p>
        <TextField
          type='text'
          placeholder='How much?'
          onChange={(e) => setCreatePrice(e.target.value)}
        />
        <p>Location:</p>
        <TextField
          type='text'
          placeholder='Where are you selling from?'
          onChange={(e) => setCreateLocation(e.target.value)}
        />
        <p>Are You Willing to Deliver the Item? (Only click if yes!)</p>
        <Switch
          onChange={(e) => {
            e.preventDefault()
            { e.target.checked ? setWillDeliver(true) : setWillDeliver(false) }
          }} />

      </form>

      <Button variant='contained' onClick={() => addPost()}>Create Listing</Button>
      {/* <Snackbar>
            open={open};
            message= {'Your post was successfully created!'};
            anchorOrigin={{
              vertical: 'top',
              horiztonal: 'center',
            }};
            autoHideDuration={6000};
            onClose={ () => setOpen(false) }
          </Snackbar> */}
    </div>

  )
}

export default CreatePost;