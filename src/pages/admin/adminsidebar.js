import React from "react";
import { MdDashboard, MdHeadphones } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUsers, FiLogOut } from "react-icons/fi";

function AdminSidebar({ page, setPage, setMobileOpen }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <MdDashboard size={20} /> },
    { key: "Earphones", label: "Earphones", icon: <MdHeadphones size={20} /> },
    { key: "orders", label: "Orders", icon: <AiOutlineShoppingCart size={20} /> },
    { key: "customers", label: "Users", icon: <FiUsers size={20} /> },
  ];

  const handleClick = (key) => {
    setPage(key);
    if (setMobileOpen && window.innerWidth < 768) {
      setMobileOpen(false); // Close sidebar on mobile
    }
  };

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3 shadow position-fixed"
      style={{ width: "100%", maxWidth: "240px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold text-center mb-4">MASMAP Admin</h4>

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.key} className="nav-item mb-1">
            <button
              className={`nav-link d-flex align-items-center gap-3 w-100 text-start ${
                page === item.key ? "active bg-primary" : "text-white-50"
              }`}
              style={{ borderRadius: "8px", padding: "12px 16px" }}
              onClick={() => handleClick(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          className="btn btn-outline-danger d-flex align-items-center gap-3 w-100 mt-3"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
