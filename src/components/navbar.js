import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSearch } from "../context/searchcontext";
import { getCartItems } from "../utils/cartUtils";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserPanel, setShowUserPanel] = useState(false);
  const { searchTerm, handleSearch } = useSearch();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const [cartCount, setCartCount] = useState(() => {
    try {
      const items = getCartItems();
      return items.reduce((s, it) => s + (it.quantity || it.qty || 0), 0);
    } catch (e) {
      return 0;
    }
  });

  const handleAdminClick = () => {
    navigate("/admin-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    setShowUserPanel(false);
    navigate("/");
  };

  // listen for cart updates (same tab via custom event, cross-tab via storage)
  useEffect(() => {
    const onCartUpdated = (e) => {
      const items = e?.detail?.items || getCartItems();
      setCartCount(
        items.reduce((s, it) => s + (it.quantity || it.qty || 0), 0)
      );
    };

    const onStorage = (e) => {
      if (e.key === "MASMAP_cart") {
        try {
          const items = JSON.parse(e.newValue || "[]");
          setCartCount(
            items.reduce((s, it) => s + (it.quantity || it.qty || 0), 0)
          );
        } catch (err) {
          setCartCount(0);
        }
      }
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-3">
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand fw-bold" to="/">
          MASMAP
        </Link>

        {/* Search Bar */}
        {location.pathname === "/" && (
          <div
            className="position-absolute start-50 translate-middle-x d-none ms-5 d-lg-block"
            style={{ maxWidth: "300px", width: "100%" }}
          >
            <div className="position-relative">
              <FaSearch
                className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2"
                size={14}
              />
              <input
                type="text"
                className="form-control ps-4"
                placeholder="Search earphones..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        )}

        {/* Right side buttons */}
        <div className="d-flex align-items-center gap-2 ms-auto order-last">
          {/* Admin Button (square like cart) */}
          {user && user.role === "admin" && (
            <button
              className="btn btn-outline-light d-flex align-items-center justify-content-center me-1"
              onClick={handleAdminClick}
              style={{ width: "44px", height: "44px" }}
              title="Admin Panel"
            >
              <MdAdminPanelSettings size={18} />
            </button>
          )}

          {/* User Icon / Login */}
          {token ? (
            <button
              className="btn btn-outline-light d-flex align-items-center justify-content-center"
              onClick={() => setShowUserPanel(true)}
              style={{ width: "44px", height: "44px" }}
            >
              <FaUserCircle size={20} />
            </button>
          ) : (
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Cart */}
          <button
            className="btn btn-outline-light d-flex align-items-center justify-content-center position-relative"
            onClick={() => navigate("/cart")}
            style={{ width: "44px", height: "44px" }}
          >
            <FaShoppingCart size={20} />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              {cartCount}
            </span>
          </button>
        </div>

        <div className="collapse navbar-collapse w-100" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Search */}
      {location.pathname === "/" && (
        <div className="d-lg-none bg-dark border-top border-secondary px-3 py-2">
          <div className="position-relative">
            <FaSearch
              className="position-absolute top-50 start-0 translate-middle-y text-muted ms-2"
              size={14}
            />
            <input
              type="text"
              className="form-control ps-4"
              placeholder="Search earphones..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}

      {/* User Panel Modal */}
      {showUserPanel && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div className="modal-content w-50">
              <div className="modal-header bg-dark text-light">
                <h5 className="modal-title">User Panel</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowUserPanel(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <FaUserCircle size={60} className="text-secondary mb-3" />
                <h5>{user?.name}</h5>

                <hr />
                <button
                  className="btn btn-outline-dark w-100 mb-2"
                  onClick={() => {
                    setShowUserPanel(false);
                    navigate("/myorders");
                  }}
                >
                  <FaBoxOpen className="me-2" />
                  My Orders
                </button>
                <button
                  className="btn btn-outline-dark w-100 mb-2"
                  onClick={() => {
                    setShowUserPanel(false);
                    navigate("/profile");
                  }}
                >
                  <FaUserGear className="me-2" />
                  My Profile
                </button>

                <button
                  className="btn btn-danger w-100 mt-3"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
