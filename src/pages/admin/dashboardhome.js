import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { MdShoppingBag, MdPeople, MdAttachMoney } from "react-icons/md";
import "./dashboard.css"

function DashboardHome() {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [lastUsers, setLastUsers] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const ordersRes = await api.get("/orders/all");
        const usersRes = await api.get("/users/all");

        const ordersData = ordersRes.data?.orders || ordersRes.data || [];
        const usersData = usersRes.data?.users || usersRes.data || [];

        const ordersCount = Array.isArray(ordersData) ? ordersData.length : 0;
        const usersCount = Array.isArray(usersData) ? usersData.length : 0;

        const revenue = Array.isArray(ordersData)
          ? ordersData.reduce((s, o) => s + Number(o.totalPrice || 0), 0)
          : 0;

        setStats({ orders: ordersCount, users: usersCount, revenue });

        const latest = [...usersData]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setLastUsers(latest);

      } catch (err) {
        console.error("Failed to load stats", err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="container-fluid">

      {/* ==== TOP STATS ==== */}
      <div className="row g-4 mb-4">

        {/* ORDERS CARD */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm p-4 text-center border-0 rounded-4">
            <MdShoppingBag size={40} className="text-primary mb-2" />
            <h3 className="fw-bold">{stats.orders}</h3>
            <p className="text-muted m-0">Total Orders</p>
          </div>
        </div>

        {/* USERS CARD */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm p-4 text-center border-0 rounded-4">
            <MdPeople size={40} className="text-success mb-2" />
            <h3 className="fw-bold">{stats.users}</h3>
            <p className="text-muted m-0">Total Users</p>
          </div>
        </div>

        {/* REVENUE CARD */}
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm p-4 text-center border-0 rounded-4">
            <MdAttachMoney size={40} className="text-warning mb-2" />
            <h3 className="fw-bold">₹{stats.revenue.toLocaleString()}</h3>
            <p className="text-muted m-0">Total Revenue</p>
          </div>
        </div>

      </div>

      {/* ==== LAST 5 USERS ==== */}
      <div className="card shadow-sm p-3 border-0 rounded-4">
        <h5 className="mb-3">Latest 5 Users</h5>

        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {lastUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.createdAt?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default DashboardHome;
