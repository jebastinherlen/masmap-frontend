import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api/axios";

function AdminEarphonesPage() {
  const [products, setProducts] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showPopup = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const [newProduct, setNewProduct] = useState({
    brand: "",
    model: "",
    type: "",
    price: "",
    color: "",
    rating: "",
    in_stock: true,
    image: [],
  });

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get("/earphones");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    loadProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    try {
      const form = new FormData();
      Object.keys(newProduct).forEach((key) => {
        if (key === "image") newProduct.image.forEach((f) => form.append("image", f));
        else form.append(key, newProduct[key]);
      });

      const { data } = await api.post("/earphones", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, data]);
      setShowAddModal(false);
      showPopup("Earphone added successfully!");

      setNewProduct({
        brand: "",
        model: "",
        type: "",
        price: "",
        color: "",
        rating: "",
        in_stock: true,
        image: [],
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Open edit
  const openEdit = (p) => {
    setProductToEdit(p);
    setShowEditModal(true);
  };

  // Save edit (PATCH)
  const saveEdit = async () => {
    try {
      const form = new FormData();
      Object.keys(productToEdit).forEach((key) => {
        if (key === "image" && Array.isArray(productToEdit.image)) {
          productToEdit.image.forEach((f) => form.append("image", f));
        } else {
          form.append(key, productToEdit[key]);
        }
      });

      const { data } = await api.patch(`/earphones/${productToEdit._id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts(products.map((p) => (p._id === productToEdit._id ? data : p)));
      setShowEditModal(false);
      showPopup("Earphone updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    try {
      await api.delete(`/earphones/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      showPopup("Earphone deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Earphones List</h3>
      <Button className="mb-3" onClick={() => setShowAddModal(true)}>
        + Add Earphone
      </Button>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th style={{ width: "140px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.image?.[0] || "https://via.placeholder.com/100"}
                  alt={`${p.brand} ${p.model}`}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{p.brand}</td>
              <td>{p.model}</td>
              <td>₹{p.price}</td>
              <td>
                <Button size="sm" onClick={() => openEdit(p)}>
                  Edit
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    setProductToDelete(p);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Earphone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["brand", "model", "type", "price", "color", "rating"].map((f) => (
              <Form.Group className="mb-3" key={f}>
                <Form.Label>{f.toUpperCase()}</Form.Label>
                <Form.Control
                  value={newProduct[f]}
                  type={f === "price" || f === "rating" ? "number" : "text"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, [f]: e.target.value })
                  }
                />
              </Form.Group>
            ))}

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="In Stock"
                checked={newProduct.in_stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, in_stock: e.target.checked })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: Array.from(e.target.files) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addProduct}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Earphone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productToEdit && (
            <Form>
              {["brand", "model", "type", "price", "color", "rating"].map((f) => (
                <Form.Group className="mb-3" key={f}>
                  <Form.Label>{f.toUpperCase()}</Form.Label>
                  <Form.Control
                    value={productToEdit[f]}
                    type={f === "price" || f === "rating" ? "number" : "text"}
                    onChange={(e) =>
                      setProductToEdit({ ...productToEdit, [f]: e.target.value })
                    }
                  />
                </Form.Group>
              ))}

              <Form.Group>
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      image: Array.from(e.target.files),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE MODAL */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <b>{productToDelete?.brand} {productToDelete?.model}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* TOAST */}
      {showToast && (
        <div
          className="toast position-fixed bottom-0 end-0 m-4 show"
          style={{ zIndex: 9999, minWidth: "250px" }}
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Success</strong>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}

export default AdminEarphonesPage;
