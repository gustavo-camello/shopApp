import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import { getProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const ProductPage = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch]);

  const addToCarthandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">

        <div className="border border-2 border-red-400 flex justify-center">
          <img src={product.image} alt={product.name}/>
        </div>

        <div className="border border-2 border-green-300 flex justify-between flex-col">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text">{product.description}</p>
          <Rating value={product.numReviews}/>
          <p className="">Price: {product.price}</p>
          {product.countInStock > 0 && (
            <>
            <p>Quantity</p>
              <form>
                <label>
                  Quantity:
                  <select type="select" value={quantity} onChange={(e) => setQuantity(e.target.value)} >
                    {[...Array(product.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1} >{x + 1}</option>
                    ))}
                  </select>
                </label>
              </form>
            </>
          )}
          <p>Availability: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          <button className="uppercase bg-black text-white px-6 py-3 w-1/2 mx-auto disabled:opacity-50" type="button" disabled={product.countInStock <= 0} onClick={addToCarthandler}>Add to cart</button>
        </div>

      </div>

      <Link to="/">Go back</Link>
    </div>


    
  )

  
}

export default ProductPage;
