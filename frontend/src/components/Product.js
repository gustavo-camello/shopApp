import React from 'react';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <Link to={`/product/${product._id}`}>
          <img className="hover:grow hover:shadow-lg" src={product.image} alt={product.name}/>
          <div className="pt-3 flex flex-col items-start justify-between">
            <p className="text-sm">{product.name}</p>
            <Rating value={product.numReviews} />
            <p class="pt-1 text-gray-900 font-bold">€{product.price}</p>
          </div>
        </Link>        
      </div> 
    </>
  )
}

export default Product
