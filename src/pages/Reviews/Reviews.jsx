import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import firebase from '../../firebase';
import { useAuth } from '../../contexts/authContext/AuthContext';
import './reviews.css';

const db = firebase.firestore().collection('products');

const Reviews = () => {
  const {user} = useAuth();
  const [product, setProduct] = useState([]);
  const [rev, setRev] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getProduct = () => {
     try {
    db.where('id', '==', id).onSnapshot(querySnapShot => {
      const items = [];
      querySnapShot.forEach(doc => {
        items.push(doc.data())
      })
      setProduct(items)
    })
     }catch(err){
       console.log(err);
     }  
  }
  getProduct()
  }, [id])


  const handleSubmit = (e) => {
    e.preventDefault()
    db.doc(id).update({
      reviews: firebase.firestore.FieldValue.arrayUnion({
        username: user.email,
        review: rev
      })
    })
  }

  return (
    <div className="container">
      <div className="product__container">
      {console.log(product)}
      </div>
      <div className="reviews__container">
        {product && product.map(prod => (
          prod.reviews.map(review => (
            <div key={review.review}>
            <h3>{review.username}</h3>
            <p>{review.review}</p>
            </div>
          ))
        ))}
      </div>
      {user && 
      <form onSubmit={handleSubmit} className="review__form">
        <textarea cols="10" rows="10" placeholder="Please submit your review" value={rev} onChange={(e) => setRev(e.target.value)}></textarea>
        <button type="submit" className="review-btn">Submit review</button>
      </form>}
    </div>
  )
}

export default Reviews;