import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Ecommerce" />
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          <Link to="/search" className="navbar-icon">
            <FaSearch />
          </Link>
          <Link to="/cart" className="navbar-icon">
            <FaShoppingCart />
          </Link>
          <Link to="/login" className="navbar-icon">
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
