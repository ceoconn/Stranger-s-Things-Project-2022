import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';

const Listing = ({ posts }) => {

  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  function handleSearch() {
    

    const newFilteredPosts = posts.filter(filteredPost => {
      const { title } = filteredPost;

      if (title.includes(search)) {
        return filteredPost
      } else { return false }

    }
    );
    setFilteredPosts(newFilteredPosts)

  };



  return (
    <div id='outer div element'>

      <div id='outer-search'>
        <form id='filter-form'>
          <TextField id='search'
            variant='filled'
            placeholder="search..."
            onChange={(e) => {
              setSearch(e.target.value)

              handleSearch() 
            }}>
          </TextField>
        </form>

      </div>
      {
        filteredPosts.map((filteredPost) => {
          const { description, location, price, title, _id, isAuthor } = filteredPost;

          return (
            <Paper id='listing' elevation='4'
              key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              {
                isAuthor ? (
                  <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                ) : (
                  <Link to={`/posts/${_id}`} style={{ textDecoration: 'none' }}><strong>View</strong></Link>
                )
              }
            </Paper>
          )
        })
      }


    </div>
  )
}


export default Listing;