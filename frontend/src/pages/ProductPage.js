import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ProductPage = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch]);

  const addToCarthandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="flex justify-between flex-col ml-6">
          <div className="mt-6">
            <h3 className="text-2xl font-bold uppercase">{product.name}</h3>
            <p className="flex my-2">
              <Rating value={product.numReviews} /> reviews
            </p>
            <div className="flex justify-around flex-col my-8">
              <p>
                Availability:{" "}
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p>Product Code: {product._id}</p>
            </div>
            <p className="text-2xl text-green-500 my-4">EUR {product.price}</p>
            <p className="text">{product.description}</p>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
              {product.countInStock > 0 && (
                <>
                  <form className="flex flex-col">
                    <label className="font-bold text-sm">Quantity:</label>
                    <select
                      className="border-b p-1"
                      type="select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </>
              )}
            </div>
            <div>
              <button
                className="uppercase bg-black text-white px-6 py-3 mx-auto disabled:opacity-50"
                type="button"
                disabled={product.countInStock <= 0}
                onClick={addToCarthandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link to="/">Go back</Link>
    </div>
  );
};

export default ProductPage;
