import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div>
      <div className="max-w-md w-full space-y-8">
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="paymentMethod">Select Method:</label>
              <input
                type="radio"
                label="Paypal or Credit Card"
                id="Paypal"
                name="paymentMethod"
                value="Paypal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="Paypal">Paypal</label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={submitHandler}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
