import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // Popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem("token");

  // Load Orders
  const loadOrders = async () => {
    try {
      const res = await axios.get("/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Popup show function
  const showSuccessPopup = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1800);
  };

  // Update Payment Status
  const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      setLoadingId(id);

      await axios.patch(
        `/orders/${id}/paymentstatus`,
        { paymentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showSuccessPopup("Payment Status Updated Successfully!");
      loadOrders();
    } catch (err) {
      showSuccessPopup("Failed to update payment status");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="card p-3">
        <h4 className="mb-3">All Orders</h4>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6)}</td>
                <td>{o.user?.name}</td>
                <td>₹{o.totalPrice}</td>

                <td>
                  <select
                    className="form-select"
                    defaultValue={o.paymentStatus}
                    disabled={loadingId === o._id}
                    onChange={(e) =>
                      updatePaymentStatus(o._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Smooth Bottom Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "#28a745",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            transition: "0.3s",
            fontWeight: "500",
          }}
        >
          {popupMessage}
        </div>
      )}
    </>
  );
}

export default OrdersPage;
