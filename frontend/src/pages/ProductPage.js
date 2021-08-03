import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import { getProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch])


  return (
    <>
      {loading ? <Loader/> : error ? <h3>{error}</h3> : 
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
        </div>
      }
      
      
      <Link to="/">Go back</Link>
    </>
  )
}

export default ProductPage;
