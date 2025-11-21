import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./adminsidebar";
import { MdMenu } from "react-icons/md";

function AdminLayout() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // 🚀 prevents whole page from scrolling
      }}
    >
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block bg-dark text-white"
        style={{
          width: "250px",
          height: "100vh", // full screen
          position: "fixed",
          left: 0,
          top: 0,
          overflow: "hidden", // 🚀 stops sidebar scrolling
        }}
      >
        <AdminSidebar page={page} setPage={setPage} />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 998 }}
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Mobile Drawer */}
          <div
            className="position-fixed bg-dark text-white shadow"
            style={{
              width: "250px",
              height: "100vh",
              zIndex: 999,
              top: 0,
              left: 0,
              overflowY: "hidden ",
            }}
          >
            <AdminSidebar
              page={page}
              setPage={setPage}
              setMobileOpen={setMobileOpen}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: "250px", // space for desktop sidebar
          height: "100vh",
          overflow: "hidden", // prevents page scroll
        }}
      >
        {/* Navbar */}
        <nav className="navbar bg-primary text-white px-3 py-2">
          <button
            className="btn btn-light d-md-none"
            onClick={() => setMobileOpen(true)}
          >
            <MdMenu size={22} />
          </button>
          <h4 className="m-0 ms-2">Admin Panel</h4>
        </nav>

        {/* SCROLLABLE CONTENT */}
        <div
          style={{
            height: "calc(100vh - 56px)", // remove navbar height
            overflowY: "auto", // 🚀 only this area scrolls
            background: "#f8f9fa",
            padding: "16px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
