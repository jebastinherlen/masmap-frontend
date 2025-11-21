import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeFromCart,
  // clearCart,
  updateQuantity,
} from "../../utils/cartUtils";
import { BsTrash, BsCartCheck } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id) => {
    const updated = removeFromCart(id);
    setCartItems(updated);
  };

  const handleIncreaseQuantity = (id) => {
    const item = cartItems.find((it) => (it._id || it.id) === id);
    if (item) {
      const updated = updateQuantity(id, item.quantity + 1);
      setCartItems(updated);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((it) => (it._id || it.id) === id);
    if (item && item.quantity > 1) {
      const updated = updateQuantity(id, item.quantity - 1);
      setCartItems(updated);
    }
  };

  // const handleClear = () => {
  //   clearCart();
  //   setCartItems([]);
  // };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="container text-center py-5">
        <h3>Your Cart is Empty 🛒</h3>
      </div>
    );

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">My Cart</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "15px",
                    }}
                  />
                  <span>{item.name}</span>
                </td>
                <td>₹{item.price}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleDecreaseQuantity(item._id || item.id)
                      }
                    >
                      −
                    </button>
                    <span className="px-2 fw-semibold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        handleIncreaseQuantity(item._id || item.id)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item._id || item.id)}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        {/* <button className="btn btn-outline-secondary" onClick={handleClear}>
          Clear Cart
        </button> */}
        <div className="text-end">
          <h4 className="fw-bold">Total: ₹{totalPrice}</h4>
          <button
            className="btn btn-success mt-2 d-flex align-items-center gap-2"
            onClick={() => navigate("/checkout")}
          >
            <BsCartCheck /> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
