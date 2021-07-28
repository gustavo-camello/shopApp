import React from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const Product = ({ match }) => {
  const product = products.find(p => p._id === match.params.id)

  return (
    <div>
      
      <h3>{product.name}</h3>
      <img src={product.image}></img>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>
        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
      </p>
      <div>
        <button disabled={product.countInStock === 0}>
          Add to Cart
        </button>
      </div>
      
      <Link to="/">Go back</Link>
    </div>
  )
}

export default Product;
