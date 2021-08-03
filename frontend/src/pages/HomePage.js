import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts())

  }, [dispatch])

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  return (
    <>
    <h1>Latest Products</h1>
    {loading ? <Loader/> : error ? <ErrorMessage/> : 
     <div className="flex">
     {products.map(product => (
       <Product product={product} />
     ))}
   </div>
   }
    </>
  )
}

export default HomeScreen
