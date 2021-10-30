import { useHistory } from 'react-router-dom';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import './productCard.css';

const ProductCard = ({prod}) => {

  const history = useHistory();
  return (
    <div className="product__card-container">
      <button className="back-btn" onClick={()=>history.goBack('-1')}>
        <MdOutlineKeyboardBackspace className="back-icon"/>
      </button>
       <div className="product__image-container">
         <h2 className="heading">{prod.name}</h2>
        <img src={prod.imageUrl ? prod.imageUrl : 'https://source.unsplash.com/1600x900/?nature,water'} alt={prod.name} className="product__image"/>
      </div>
      
      <div className="product__card-text">
        <h4 className="product__review-number">
          {prod.reviews.length} {`${prod.reviews.length <= 1 ? 'review' : 'reviews'}`}
        </h4>
        <p className="product__description">{prod.description}</p>
      </div>
    </div>
  )
}

export default ProductCard
