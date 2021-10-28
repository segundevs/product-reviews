import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import firebase from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './reviews.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

import Comment from '../../components/Comment/Comment';

const db = firebase.firestore().collection('products');

const Reviews = () => {
  const {user} = useAuth();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rev, setRev] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getProduct = () => {
      setLoading(true)
     try {
    db
    .where('id', '==', id)
    .onSnapshot(querySnapShot => {
      const items = [];
      querySnapShot.forEach(doc => {
        items.push(doc.data())
      })
      setProduct(items)
      setLoading(false)
    })
     }catch(err){
      setError(err.message)
      setLoading(false)
     }  
  }
  getProduct()
  }, [id])


  const handleSubmit = (e) => {
    e.preventDefault()
      setLoading(true)
    try{
      db.doc(id).update({
        reviews: firebase.firestore.FieldValue.arrayUnion({
          owner: user? user.uid : 'unknown',
          username: user.displayName? user.displayName : 'Anonymous',
          review: rev
        })
      })
      setLoading(false)
      toast.success('Thank you for submitting your review !', {theme: "colored", autoClose: 2000 })
    }catch(err){
      setError(err.message)
      setLoading(false)
      toast.error(error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
    }
    setRev('')
  }

  const handleClick = (rev) => {
    db.doc(id).update({
      reviews: firebase.firestore.FieldValue.arrayRemove({
        owner: user.uid,
        review: rev,
        username: user.displayName ? user.displayName : 'Anonymous'
      })
    })
  }

  return (
    <div className="product__container">
      {product && product.map(prod => (
        <div key={prod.id}>
          <ProductCard prod={prod}/>
        </div>
      ))}
      
      <div className="reviews__container">
        {product && product.map(prod => (
          prod.reviews.map(review => (
            <Comment key={review.review} review={review} handleClick={handleClick}/>
          ))
        ))}
      </div>
      {user && 
      <form onSubmit={handleSubmit} className="review__form">
        <textarea cols="10" rows="10" placeholder="Please submit your review" required value={rev} onChange={(e) => setRev(e.target.value)}></textarea>
        <button type="submit" className="review-btn">{loading ? <Loader /> : 'Submit review'}</button>
      </form>}
    </div>
  )
}

export default Reviews;