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
     <section className="container mx-auto flex items-start flex-wrap pt-4 pb-12">
      {products.map(product => (  
        <Product product={product} />
      ))}
      </section>
   }
    </>
  )
}

export default HomeScreen
