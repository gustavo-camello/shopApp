import React from 'react';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <div className="flex">
        {products.map(product => (
          <Product product={product} />
        ))}
      </div>
    </>
  )
}

export default HomeScreen
