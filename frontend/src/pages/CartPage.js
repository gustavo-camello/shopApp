import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ErrorMessage from '..components/ErrorMessage';
import ErrorMessage from '../components/ErrorMessage';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const CartPage = ({ match, location, history}) => {
  const productId = match.params.id

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }


  return (
    <main className="container">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <>
        <ErrorMessage />
        <Link to="/">Go Back</Link>
      </>
      ) : (
        <>
        <ul>
          {cartItems.map(item => (
            <li key={item.product} className="grid grid-cols-5">
              <img src={item.image} alt={item.name}/>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <span>${item.price}</span>
              <form>
                <label>
                  Quantity:
                  <select type="select" value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                    {[...Array(item.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1} >{x + 1}</option>
                    ))}
                  </select>
                </label>
              </form>
              <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="my-10">
          <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
          <p>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
          <button type="button" className="disabled:opacity-50" disabled={cartItems.lenght <= 0} onClick={checkoutHandler}>Proceed to Checkout</button>
        </div>
        </>
      )}
    </main>
  )
}

export default CartPage
