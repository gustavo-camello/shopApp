import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center flex-col p-5">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} variant="top" />
        </Link>
        <Link to={`/product/${product._id}`}>
          <strong>{product.name}</strong>
          <p>{product.price}</p>
          <Rating 
            value={product.rating}
            text={`${product.numReviess} reviews`} 
          />
        </Link>
      </div> 
    </>
  )
}

export default Product
