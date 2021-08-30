import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-between">
      {step1 ? (
        <Link to="/login">Sign in</Link>
      ) : (
        <button disabled className="disabled: text-gray-300">
          <Link>Sign in</Link>
        </button>
      )}
      {step2 ? (
        <Link to="/shipping">Shipping</Link>
      ) : (
        <button disabled className="disabled: text-gray-300">
          <Link>Shipping</Link>
        </button>
      )}
      {step3 ? (
        <Link to="/payment">Payment</Link>
      ) : (
        <button disabled className="disabled: text-gray-300">
          Payment
        </button>
      )}
      {step4 ? (
        <Link to="/placeorder">Place Order</Link>
      ) : (
        <button disabled className="disabled: text-gray-300">
          Place Order
        </button>
      )}
    </nav>
  );
};

export default CheckoutSteps;
