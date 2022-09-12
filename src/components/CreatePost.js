import React from 'react';
import { createPost } from '../api';
import { Button } from '@mui/material';
import { Switch } from '@mui/material';

const CreatePost = ({ token, fetchPosts, navigate, title, description, price, location, willDeliver }) => {
  const newPost = {
    title: {title},
    description: {description},
    price: {price},
    location: {location},
    willDeliver: false
  }
  
  async function addPost() {
    const results = await createPost(token, newPost)
    fetchPosts();
    navigate(`/posts`)
  }
  
  return (
    <div id='post-form'>
    <form>
      <p>Item:</p>
      <input 
      type='text' 
      placeholder='Name of Item'
      onChange= { (e) => {
        e.preventDefault()
        title = e.target.value
        console.log(title)
      } }/>
      <p>Description:</p>
      <input 
      type='text' 
      placeholder='What is it?' />
      <p>Price:</p>
      <input 
      type='text' 
      placeholder='How much?' />
      <p>Location:</p>
      <input 
      type='text' 
      placeholder='Where are you selling from?' />
      <p>Are You Willing to Deliver the Item? (Only check if yes!)</p>
      <Switch
      onChange={ (e) =>  {
        e.preventDefault()
        e.target.checked ? willDeliver = true : willDeliver = false
       }} />
      
    </form>
    
    <Button variant='contained' onClick={() => addPost()}>Create Listing</Button>
    </div>
    
  )
}

export default CreatePost;