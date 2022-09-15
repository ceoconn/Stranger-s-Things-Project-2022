import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';
import { Button } from '@mui/material';

const Listing = ({ posts }) => {

  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [willDeliverCheck, setWillDeliverCheck] = useState(false);

  function handleSearch(value) {
    setSearch(value)

    const newFilteredPosts = posts.filter(filteredPost => {
      const { title } = filteredPost;

      if (title.toLowerCase().includes(search.toLowerCase())) {
        return filteredPost
      } else { return false }

    }
    );
    setFilteredPosts(newFilteredPosts)

  };


  return (

    <div id='outer-search'>

      <form id='filter-form'>
        <TextField id='search'
          variant='standard'
          helperText='search'
          placeholder="what are you looking for?"
          onChange={(e) => handleSearch(e.target.value)}>
        </TextField>
        <p>Only show posts where seller will deliver:
          <Switch
            type='checkbox'
            checked={willDeliverCheck}
            onChange={(e) => {
              setWillDeliverCheck(e.target.checked)
            }}
          /></p>
      </form>

      {
        filteredPosts.map((filteredPost) => {
          const { willDeliver, description, location, price, title, _id, isAuthor } = filteredPost;

          if (willDeliverCheck) {
            if (willDeliver) {
              return (

                <Paper id='listing' elevation={4}
                  key={_id}>
                  <h3>{title}</h3>
                  <p>Description: {description}</p>
                  <p>Price: {price}</p>
                  <p>Location: {location}</p>
                  {
                    isAuthor ? (
                      <Button id='edit-button' variant='text'><Link to={`/posts/edit-post/${_id}`} style={{color:'black', textDecoration:'none'}}><strong>Edit</strong></Link></Button>

                    ) : (
                      <Button id='view-button' variant='contained'><Link to={`/posts/${_id}`} style={{color:'black', textDecoration:'none'}}><strong>View</strong></Link></Button>
                    )
                    }
      
                  
                </Paper>

              )
            }
          } else {

            return (

              <Paper id='listing' elevation={4}
                key={_id}>
                <h3>{title}</h3>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                {
                  isAuthor ? (
                    <Button id='edit-button' variant='text'><Link to={`/posts/edit-post/${_id}`} style={{color:'black', textDecoration:'none'}}><strong>Edit</strong></Link></Button>
                  ) : (
                    <Button id='view-button' variant='contained'><Link to={`/posts/${_id}`} style={{color:'black', textDecoration:'none'}}><strong>View</strong></Link></Button>
                  )
                }
              </Paper>

            )
          }
        })
      }
    </div>

  )
}


export default Listing;