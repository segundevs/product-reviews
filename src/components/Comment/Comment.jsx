import Avatar from 'react-avatar';
import {MdDelete} from 'react-icons/md';
import { useAuth } from '../../contexts/AuthContext';


import './comment.css'

const Comment = ({review, handleClick}) => {

  const {user} = useAuth();

  return (

    <div key={review.review} className="user-review">
      <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={review.username? `${review.username.substring(0, 1)} ${review.username.substring(1, 2)}` : 'unknown'} className="avatar" size="40"/>
        <div className="review">
          <h3>{review.username}</h3>
          <p>{review.review}</p>
        </div>
      {user ? user.uid === review.owner && 
        <button onClick={() => handleClick(review.review)} className="delete-btn">
          <MdDelete className="delete-icon"/>
        </button>
      : null}            
    </div>
  )
}

export default Comment
