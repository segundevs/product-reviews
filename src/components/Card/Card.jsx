import {Link} from 'react-router-dom';
import { format } from 'timeago.js';
import { useAuth } from '../../contexts/AuthContext';
import {MdDelete} from 'react-icons/md';
import firebase from '../../firebase';
import './card.css';


const db = firebase.firestore().collection('products');


const Card = ({prod}) => {

  const {user} = useAuth();

  function deleteFile (url){
    return firebase
      .storage()
      .refFromURL(url)
      .delete()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

 function deleteProduct(prod){
   return db
    .doc(prod.id)
    .delete(prod)
    .catch(err => {
      console.log(err.message);
    })
  }

 async function removeFromDB(prod){
  await  deleteProduct(prod)
  await  deleteFile(prod.imageUrl)
  }

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={prod.imageUrl ? prod.imageUrl : 'https://source.unsplash.com/1600x900/?nature,water'} alt={prod.name} className="product__image"/>
      </div>
  
      <div className="card__text">
        {user ? user.uid === prod.owner && 
        <button className="del-btn" onClick={() => removeFromDB(prod)}><MdDelete /></button> : null}
        <div className="card__text-details">
          <h4 className="name">{prod.name}</h4>

          <p className="description mobile">{`${prod.description.substring(0, 50)}...`}</p>
          <p className="description desktop">{`${prod.description.substring(0, 80)}...`}</p>

            <Link to={`/reviews/${prod.id}`} className="reviews">
              {prod.reviews.length} {`${prod.reviews.length <= 1 ? 'review' : 'reviews'}`}
            </Link>
          <div className="card__text-sub-details">
            <h5>{prod.createdAt? format(prod.createdAt.toDate()) : null}</h5>
            <h5>Posted by {prod.username ? prod.username : 'Anonymous'}</h5>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Card
