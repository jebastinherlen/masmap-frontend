import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

// Add to Cart Modal Component
function AddToCartModal({ show, productName, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Added to Cart</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>
              <strong>{productName}</strong> has been added to your cart.
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-warning" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// MAIN PRODUCT CARD
function ProductCard({ product }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [addedName, setAddedName] = useState("");

  const handleClick = () => {
    const pid = product._id || product.id;
    navigate(`/product/${pid}`);
  };

  return (
    <>
      <div
        className="card product-card shadow-sm border-0 h-100 text-center"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <img
          src={product.image || "https://via.placeholder.com/200"}
          alt={product.name}
          className="card-img-top p-3"
          style={{ height: "200px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title">{product.brand}</h5>
          <p className="text-muted">{product.name}</p>
          <p className="fw-bold">₹{product.price}</p>

          <div className="d-grid d-sm-flex gap-2">

            {/* ADD TO CART WITH MODAL */}
            <button
              className="btn btn-dark flex-grow-1"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);

                setAddedName(
                  `${product.brand} ${product.model || product.name}`
                );
                setShowModal(true);

                setTimeout(() => setShowModal(false), 1500);
              }}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-success flex-grow-1"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AddToCartModal
        show={showModal}
        productName={addedName}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default ProductCard;
