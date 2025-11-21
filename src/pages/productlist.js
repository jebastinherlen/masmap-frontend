import React, { useState, useEffect } from "react";
import ProductCard from "../components/productcard";
import { useSearch } from "../context/searchcontext";
import api from "../api/axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/earphones", { skipAuth: true });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtered products
  const filteredProducts = searchTerm
    ? products.filter((product) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower)
        );
      })
    : products;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Our Products</h2>

      {/* Search feedback */}
      {searchTerm && (
        <p className="text-muted text-center mb-3">
          Showing results for: <strong>{searchTerm}</strong>
        </p>
      )}

      {/* Loading UI */}
      {loading && <p className="text-center">Loading products...</p>}

      {/* Error UI */}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row">
        {!loading && !error && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-center w-100">
              {searchTerm
                ? "No products found matching your search."
                : "No products found."}
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default ProductList;
