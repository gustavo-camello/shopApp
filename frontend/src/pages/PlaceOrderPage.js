import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import ErrorMessage from "../components/ErrorMessage";
import { createOrder } from "../actions/orderActions";

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  cart.taxesPrice = addDecimals(Number((0.02 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxesPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itensPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxesPrice: cart.taxesPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <h2>Shipping</h2>
        <p>
          <strong>Address:</strong>
          {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
          {cart.shippingAddress.postalCode}, {""} {cart.shippingAddress.country}
        </p>
      </div>
      <div>
        <h2>Payment Method:</h2>
        <strong>Method: </strong> {cart.paymentMethod}
      </div>
      <div>
        <h2>Order Items:</h2>
        {cart.cartItems.length === 0 ? (
          <ErrorMessage value={"Your cart is empty"}></ErrorMessage>
        ) : (
          cart.cartItems.map((item, index) => <li key={index}>{item.name}</li>)
        )}
      </div>
      <div>
        <h2>Order Summary</h2>
        <p>Items: ${cart.itemsPrice}</p>
        <p>Shipping: ${cart.shippingPrice}</p>
        <p>Taxes: ${cart.taxesPrice}</p>
        <p>Total: ${cart.totalPrice}</p>
        {error && <ErrorMessage value={error}></ErrorMessage>}
        <button
          type="button"
          className="disabled:opacity-50"
          disabled={cart.cartItems.lenght === 0}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default PlaceOrderPage;
