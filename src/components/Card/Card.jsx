import {Link} from 'react-router-dom';
import { format } from 'timeago.js';
import { useAuth } from '../../contexts/AuthContext';
import {MdDelete} from 'react-icons/md';
import { toast } from 'react-toastify';
import firebase from '../../firebase';
import './card.css';


const db = firebase.firestore().collection('products');

const Card = ({prod}) => {

  const {user} = useAuth();

  function deleteProduct(prod){
    db
    .doc(prod.id)
    .delete(prod)
    .catch(err => {
      console.log(err.message);
    })
  }

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={prod.imageUrl ? prod.imageUrl : 'https://source.unsplash.com/1600x900/?nature,water'} alt={prod.name} className="product__image"/>
      </div>
      
      <div className="card__text">
        {user ? user.uid === prod.owner && 
        <button className="del-btn" onClick={() => deleteProduct(prod)}><MdDelete /></button> : null}
        <div className="card__text-details">
          <h4 className="name">{prod.name}</h4>

          <p className="description mobile">{`${prod.description.substring(0, 50)}...`}</p>
          <p className="description desktop">{`${prod.description.substring(0, 100)}...`}</p>

            <Link to={`/reviews/${prod.id}`} className="reviews">
              {prod.reviews.length} {`${prod.reviews.length <= 1 ? 'review' : 'reviews'}`}
            </Link>
          <div className="card__text-sub-details">
            <h5>{prod.createdAt? format('26 October 2021 09:45:43 UTC-7') : null}</h5>
            <h5>Posted by {user? user.uid === prod.owner ? user.displayName : 'Anonymous' : null}</h5>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Card
