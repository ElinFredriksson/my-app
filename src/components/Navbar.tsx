import React from 'react';
import { NavLink } from 'react-router-dom';



interface NavbarProps {
  // You can define any props you need for your Navbar component here
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home 
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/addproduct" className="nav-link">
            Add Product 
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};


export default Navbar;
