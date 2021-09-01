import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // Calculations
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=BRL`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage value={error}></ErrorMessage>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <div className="my-4">
        <p>
          <h2>Shipping</h2>
          <strong>Name: {order.user.name}</strong>
          <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        </p>
        {order.isDelivered ? (
          <ErrorMessage error="Delivered"></ErrorMessage>
        ) : (
          <ErrorMessage error="Not Delivered"></ErrorMessage>
        )}
        <p>
          <strong>Address:</strong>
          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.postalCode}, {""}{" "}
          {order.shippingAddress.country}
        </p>
      </div>
      <div className="my-4">
        <h2>Payment Method:</h2>
        <strong>Method: </strong> {order.paymentMethod}
        {order.isPaid ? (
          <ErrorMessage error="Paid on"></ErrorMessage>
        ) : (
          <ErrorMessage error="Not Paid"></ErrorMessage>
        )}
      </div>

      <div className="my-4">
        <h2>Order Items:</h2>
        {order.orderItems.length === 0 ? (
          <ErrorMessage value={"Your order is empty"}></ErrorMessage>
        ) : (
          order.orderItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))
        )}
      </div>
      <div className="my-4">
        <h2>Order Summary</h2>
        <p>Items: ${order.itemsPrice}</p>
        <p>Shipping: ${order.shippingPrice}</p>
        <p>Taxes: ${order.taxPrice}</p>
        <p>Total: ${order.totalPrice}</p>
      </div>

      <div>
        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                currency="BRL"
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;
