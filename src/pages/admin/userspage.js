import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    async function loadUsers() {
      try {
        const res = await axios.get("/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // DELETE USER
  const deleteUser = async () => {
    if (!selectedUser) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/users/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((u) => u._id !== selectedUser._id));
      setSelectedUser(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // FILTER USERS
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Customers</h4>

          <input
            type="text"
            placeholder="Search users..."
            className="form-control w-25"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border"></div>
          </div>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Joined</th>
                {currentUser?.role === "admin" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className={u.role === "admin" ? "table-warning" : ""}
                >
                  <td>{u.name}</td>
                  <td className="fw-bold">{u.role}</td>
                  <td>{u.email}</td>
                  <td>{u.createdAt?.slice(0, 10)}</td>

                  {currentUser?.role === "admin" && (
                    <td>
                      {u.role !== "admin" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => setSelectedUser(u)}
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-secondary small">Admin</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Delete User</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {selectedUser && (
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selectedUser.name}</strong>?
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteUser}
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default UsersPage;
