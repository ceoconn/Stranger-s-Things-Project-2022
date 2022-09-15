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
    // <div id='outer-div-element'>

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
                      <Link to={`/posts/edit-post/${_id}`}><strong>Edit</strong></Link>

                    ) : (
                      <Link to={`/posts/${_id}`}><strong>View</strong></Link>
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
                    <Link to={`/posts/edit-post/${_id}`} id='edit-button'><strong>Edit</strong></Link>
                  ) : (
                    <Link to={`/posts/${_id}`} id='view-button'><strong>View</strong></Link>
                  )
                }
              </Paper>

            )
          }
        })
      }
    </div>


    // </div>
  )
}


export default Listing;