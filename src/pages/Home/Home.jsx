import './home.css';
import { useState, useEffect } from 'react';
import firebase from '../../firebase';

//Components
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader';

//Firestore database
const db = firebase.firestore().collection('products');

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
    //Get all products from firestore
    const getProducts = () => {
     try {
       setLoading(true);
    db
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapShot => {
      const items = [];
      querySnapShot.forEach(doc => {
        items.push(doc.data())
      })
      setProducts(items);
      setLoading(false);
    })
     }catch(err){
      setError(err.message);
      setLoading(false)
     }  
  }
  
  getProducts()

  },[])

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="container">
      <h2 className="heading">Your favorite website for products reviews</h2>
      <input type="text" placeholder="Search your favorite products..." value={value} onChange={handleChange} className="search__input"/>
        <div className="products__results">
          {loading && <Loader/>}
          {error && <h5>Something went wrong</h5>}
          {products && products.map((prod => (
            <Card prod={prod} key={prod.name} />
          )))}
        </div>
    </div>
  )
}

export default Home
