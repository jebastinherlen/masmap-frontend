import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const { data } = await api.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(Array.isArray(data) ? data : data.orders || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load orders. Please try again."
        );
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <p>Loading your orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Error Loading Orders</h4>
          <p>{error}</p>
        </div>
      </div>
    );

  // No orders
  if (orders.length === 0)
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-info">
          <h4>No Orders Yet</h4>
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );

  // Orders Found
  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow h-100 cursor-pointer"
              onClick={() => navigate(`/order-success/${order._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">

                <div className="mb-3">
                  <span className="badge bg-info">
                    {order.status || "Pending"}
                  </span>
                </div>

                <p className="card-text mb-2">
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>

                <p className="card-text mb-2">
                  <strong>Items:</strong> {order.orderItems?.length || 0}
                </p>

                <p className="card-text text-muted small mb-0">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* <div className="card-footer bg-white border-top">
                <small className="text-primary">Click to view details</small>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Myorders;
