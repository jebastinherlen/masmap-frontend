import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">MASMAP Earphones</h5>
            <p>
              Experience premium sound and style. Shop our latest collection of
              wireless and wired earphones.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-4">
              <Link href="#" className="text-light"><FaFacebook /></Link>
              <Link href="#" className="text-light"><FaInstagram /></Link>
              <Link href="#" className="text-light"><FaTwitter /></Link>
              <Link href="#" className="text-light"><FaLinkedin /></Link>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} MASMAP Earphones. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
