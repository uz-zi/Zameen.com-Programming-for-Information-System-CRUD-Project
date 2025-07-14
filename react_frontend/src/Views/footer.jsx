//https://github.com/uz-zi/mobile_and_web_CA1
import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Zameen</h4>
          <p>Zameen.com is a Pakistan-based real estate company. Company provide an online marketplace for buying, selling, and renting properties across Pakistan. .</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Plots</a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Appartments</a></li>
            <li><a href="#">Blogs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Help & FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@zameen.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Location: 123 Fitness Ave, FitCity</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Zameen.com All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;