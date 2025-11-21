import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { getCartItems, clearCart } from "../../utils/cartUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "COD",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || item.qty || 0),
    0
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [placing, setPlacing] = useState(false);

  const placeOrder = async () => {
    // Require login/token before placing order
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order. Redirecting to login.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    // Validate form
    if (!form.address || !form.city || !form.postalCode || !form.country) {
      alert("Please fill in all address fields");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacing(true);
      const orderItems = cartItems.map((item) => ({
        earphone: item._id || item.id,
        brand: item.brand || item.name,
        quantity: item.quantity || item.qty,
        price: item.price,
        image: item.image,
      }));

      const shippingAddress = {
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      };

      console.log("Placing order with data:", {
        orderItems,
        shippingAddress,
        paymentMethod: form.paymentMethod,
        totalPrice,
      });

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress,
        paymentMethod: form.paymentMethod,
        totalPrice,
      });

      console.log("Order placed successfully:", data);
      // backend might return the created order in different shapes
      const orderId =
        data?._id || data?.id || data?.order?._id || data?.order?.id;
      clearCart();
      if (orderId) {
        navigate(`/order-success/${orderId}`);
      } else {
        // fallback: go to My Orders list if no id returned
        navigate(`/myorders`);
      }
    } catch (error) {
      console.error("Order failed:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to place order";
      alert("Order error: " + errorMsg);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "48rem", margin: "auto" }}
    >
      <h1 className="mb-4 fw-bold display-5">Checkout</h1>

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="alert alert-warning" role="alert">
          <strong>Your cart is empty!</strong> Please add items before checking
          out.
        </div>
      )}

      {/* SHIPPING FORM */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Shipping Address</h2>
          <div className="row g-3">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleInput}
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleInput}
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleInput}
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="card mb-4 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  className="d-flex justify-content-between mb-2"
                  key={item._id || item.id}
                >
                  <p>
                    {item.brand || item.name} × {item.quantity || item.qty || 0}
                  </p>
                  <p>₹{(item.quantity || item.qty || 0) * item.price}</p>
                </div>
              ))}
              <hr className="my-4" />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <p>Total</p>
                <p>₹{totalPrice}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary w-100 py-3 fs-6"
        onClick={placeOrder}
        disabled={cartItems.length === 0 || placing}
      >
        {placing ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}

export default CheckoutPage;
