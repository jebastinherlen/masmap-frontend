import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsCartPlus, BsBagCheck } from "react-icons/bs";
import { addToCart } from "../../utils/cartUtils";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EarphoneDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [earphone, setEarphone] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEarphone = async () => {
      try {
        const { data } = await api.get(`/earphones/${id}`);
        setEarphone(data);
      } catch (err) {
        console.error("Error fetching earphone details:", err);
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to load product";
        setError(msg);
      }
    };
    fetchEarphone();
  }, [id]);

  const renderStars = (rating = 4.5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} color="gold" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      else stars.push(<FaRegStar key={i} color="gold" />);
    }
    return stars;
  };

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>Error loading product</h4>
          <p>{String(error)}</p>
          <p className="small text-muted">Requested id: {String(id)}</p>
        </div>
      </div>
    );

  if (!earphone) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="py-5">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Product Image */}
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
            <img
              src={earphone.image}
              alt={earphone.name}
              className="img-fluid rounded shadow-sm"
              style={{
                maxWidth: "100%",
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-12 col-md-6">
            <h2 className="fw-bold mb-2">{earphone.name}</h2>

            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex gap-1 flex-nowrap">
                {renderStars(earphone.rating)}
              </div>
              <span className="text-muted small">
                ({earphone.reviews || 5} reviews)
              </span>
            </div>

            <h3 className="fw-bold text-success mb-3">₹{earphone.price}</h3>

            {/* Quantity */}
            <div className="d-flex align-items-center gap-2 mb-4">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-3 fw-semibold">{quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="d-grid d-sm-flex gap-2 gap-sm-3 mb-4">
              <button
                className="btn btn-dark d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                onClick={() => {
                  addToCart(earphone, quantity);
                  setShowModal(true); // Open modal

                  
                }}
              >
                <BsCartPlus /> Add to Cart
              </button>

              <button
                className="btn btn-success d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                onClick={() => {
                  addToCart(earphone, quantity);
                  navigate("/checkout");
                }}
              >
                <BsBagCheck /> Buy Now
              </button>
            </div>

            
            <div className="alert alert-success mb-4 py-2 small">
              <strong>EXTRA 5% OFF</strong> on prepaid orders!
            </div>

            
            <p className="text-secondary">
              {earphone.description ||
                "Experience premium sound quality with deep bass and crystal-clear vocals."}
            </p>
          </div>
        </div>
      </div>

      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center py-4">
          <h5 className="fw-bold mb-2">🛒 Added to Cart!</h5>
          <p className="text-muted m-0">{earphone.name}</p>

          <Button
            variant="dark"
            className="mt-3 px-4"
            onClick={() => setShowModal(false)}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>
      
    </div>
  );
}

export default EarphoneDetails;
