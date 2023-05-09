import React from 'react';
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__col">
          <h3 className="footer__title">Stock Central</h3>
          <p className="footer__description">
            Stay up-to-date with the latest financial news and insights with Stock Central. Our platform provides real-time stock quotes, personalized investment recommendations, and portfolio management tools. Join our community of investors today.
          </p>
        </div>
        <div className="footer__col">
          <h3 className="footer__title">Useful Links</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#" className="footer__link">About Us</a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">Contact Us</a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">Terms and Conditions</a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__title">Follow Us</h3>
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a href="#Facebook" className="footer__social-link">
                <FaFacebookF />
              </a>
            </li>
            <li className="footer__social-item">
              <a href="#Twitter" className="footer__social-link">
                <FaTwitter />
              </a>
            </li>
            <li className="footer__social-item">
              <a href="#instagram" className="footer__social-link">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          &copy;
          {' '}
          {new Date ().getFullYear ()}
          {' '}
          Stock Central. All rights reserved.
        </p>
        <p className="footer__dev">Designed and Developed by Vinod Kumar</p>
      </div>
    </div>
  );
};

export default Footer;
