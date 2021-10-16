import {Link} from 'react-router-dom';
import './card.css';

const Card = ({prod}) => {

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={prod.imageUrl ? prod.imageUrl : 'https://source.unsplash.com/1600x900/?nature,water'} alt={prod.name} className="product__image"/>
      </div>
      
      <div className="card__text">
        <h4 className="name">{prod.name}</h4>
        <p className="description">{prod.description}</p>
        <Link to={`/reviews/${prod.id}`} className="reviews">{prod.reviews.length} reviews</Link>
      </div>
      
    </div>
  )
}

export default Card
