import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    }

    fetchProduct();
  }, [match])

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
