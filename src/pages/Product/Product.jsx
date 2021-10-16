import {useState} from 'react';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid';
import './product.css';

const db = firebase.firestore().collection('products');

const Product = () => {


  

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState([]);

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImageUrl(await fileRef.getDownloadURL());
  }

  const prod = {
      id: uuidv4(),
      name: productName,
      description: description,
      imageUrl: imageUrl,
      reviews: [{
        username: 'bash-bash',
        review: review
      }],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    uploadProduct(prod)
  }

  function uploadProduct(product){
    db
    .doc(product.id)
    .set(product)
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Upload a product for review</h2>
      <div className="product-name">
        <label>Product Name</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}/>
      </div>

      <div className="product-name">
        <label>Product Description</label>
        <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>

      <div className="product-name">
        <label>Product Image</label>
        <input type="file"  onChange={handleFileChange}/>
      </div>

      <div className="product-name">
        <label>Product Review</label>
        <input type="text" value={review} onChange={(e) => setReview(e.target.value)}/>
      </div>

      <button >submit</button>
    </form>
  )
}

export default Product
