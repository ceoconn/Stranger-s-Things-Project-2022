import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = ({ user, posts }) => {
  const messages = user.messages;
  const userID = user._id;

  const { isAuthor } = posts;

  return (
    <div>
      <p id='profile-welcome'>Welcome {user.username}!</p>
      <div id='your-posts'>
        <h1>Active Posts:</h1>
        {
          isAuthor ?
          posts.map((post) => {
            const { description, location, price, title, _id, isAuthor } = post;

            return (
              <Paper id='listing' elevation='4'
                 key={_id}>
                <h3>{title}</h3>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                
              </Paper>
            )
          })
            : null
        }
      </div>
      <div id='inbox'>
        <h1>Inbox:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const { username } = message.fromUser;
            const { title } = message.post;

            if (userID !== fromUserID) {
              return (
                <Paper elevation={4}
                  id='inbox-msg'
                  key={message._id}>
                  <p>From User: {username} </p>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </Paper>
              )
            }
          })
        }
      </div>
      <div id='sent-mail'>
        <h1>Sent Messages:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;

            if (userID === fromUserID) {
              return (
                <Paper elevation={4}
                  id='msg-sent'
                  key={message._id}>{message.content}
                </Paper>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Profile;