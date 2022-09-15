import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';


const Profile = ({ user, posts }) => {
  const messages = user.messages;
  const userID = user._id;


  return (
    <div>
      <p id='profile-welcome'>Welcome {user.username}!</p>
      <div id='your-posts'>
        <h1>Active Posts:</h1>
        {
          posts.map((post) => {
            const { description, location, price, title, _id, isAuthor } = post;

            return (
              isAuthor ? (
                <Paper id='listing' elevation={4}
                  key={_id}>
                  <h3>{title}</h3>
                  <p>Description: {description}</p>
                  <p>Price: {price}</p>
                  <p>Location: {location}</p>

                  <Link to={`/posts/edit-post/${_id}`} id='edit-button'><strong>Edit</strong></Link>

                </Paper>
              ) : null
            )
          })
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
                  key={message._id + 'inbox'}>
                  <p style={{ paddingRight: '0.5rem' }}>From User: {username} </p>
                  <p style={{ paddingRight: '0.5rem' }}>Message: {message.content}</p>
                  <p style={{ paddingRight: '0.5rem' }}>Post Reference: {title}</p>
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
            const { title } = message.post;
            if (userID === fromUserID) {
              return (
                <Paper elevation={4}
                  id='msg-sent'
                  key={message._id + 'sent'}>
                  <p style={{ paddingRight: '0.5rem' }}>Message: {message.content}</p>
                  <p style={{ paddingRight: '0.5rem' }}>Post Reference: {title}</p>
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