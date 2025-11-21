import "./App.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProductList from "./pages/productlist";
import ProductDetails from "./pages/earphone/earphonedetails";
import CartPage from "./pages/cart/cartpage";
import CheckoutPage from "./pages/cart/checkout";
import Myorders from "./pages/cart/myorders";
import Footer from "./components/footer";
import AdminDashboard from "./pages/admin/admindashboard";
import { SearchProvider } from "./context/searchcontext";
import { AuthProvider } from "./context/authcontext";


function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>

          {/* ✨ SHOW NAVBAR + FOOTER ONLY ON PUBLIC PAGES */}
          <Routes>

            {/* Public Pages */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/myorders" element={<Myorders />} />
                    <Route path="/order-success/:id" element={<Myorders />} />
                    <Route path="/orderdetails/:id" element={<Myorders />} />
                  </Routes>
                  <Footer />
                </>
              }
            />

            {/* Admin (NO NAVBAR, NO FOOTER) */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>

        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
