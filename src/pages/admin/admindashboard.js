import React, { useState } from "react";
import AdminSidebar from "./adminsidebar";
import DashboardHome from "./dashboardhome";
import AdminEarphonesPage from "./adminearphonepage";
import OrdersPage from "./orderspage";
import CustomersPage from "./userspage";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false); // for mobile only

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* DESKTOP SIDEBAR */}
      <div className="d-none d-md-block bg-dark text-white"
        style={{ width: 250, minHeight: "100vh" }}
      >
        <AdminSidebar page={page} setPage={setPage} />
      </div>

      {/* MOBILE SIDEBAR (SLIDE IN) */}
      {mobileOpen && (
        <>
          {/* DARK BACKDROP */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 998 }}
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* SIDEBAR PANEL */}
          <div
            className="position-fixed bg-dark text-white shadow"
            style={{
              width: 250,
              height: "100vh",
              zIndex: 999,
              left: 0,
              top: 0,
              transition: "0.3s ease",
            }}
          >
            <AdminSidebar page={page} setPage={setPage} />
          </div>
        </>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 d-flex flex-column">

        {/* TOP NAVBAR */}
        <div
          className="bg-white shadow-sm d-flex align-items-center justify-content-between px-3"
          style={{ height: "60px", position: "sticky", top: 0, zIndex: 50 }}
        >
          {/* MOBILE MENU BUTTON */}
          <button
            className="btn btn-dark d-md-none"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <h5 className="m-0 fw-bold">Admin Dashboard</h5>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-3 overflow-auto" style={{ flexGrow: 1 }}>
          {page === "dashboard" && <DashboardHome />}
          {page === "Earphones" && <AdminEarphonesPage />}
          {page === "orders" && <OrdersPage />}
          {page === "customers" && <CustomersPage />}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
