import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => {

  const [search, setSearch] = useState('');

  

  function handleSearch() {
    
    posts.filter( post => {
      const { description, location, price, title, _id} = post;
    let result = post.title.match(search)

    if (result) {
      console.log('matched', result)
        return (
          <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              </div>
        )
        
        
    }})}

  

  return (
    <div id='outer div element'>

      <div id='outer-search'>
        <form id='search'>
          <input type='text' placeholder="search posts" onChange={(e) => {
            setSearch(e.target.value)

            handleSearch()
          }} />
          {/* <button type='submit'>search</button> */}
        </form>

      </div>
      {
        posts.map((post) => {
          const { description, location, price, title, _id, isAuthor } = post;
          return (
            <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              {
                isAuthor ? (
                  <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                ) : (
                  <Link to={`/posts/${_id}`}>View</Link>
                )
              }
            </div>
          )
        })
      }


    </div>
  )
}


export default Posts;