import React from 'react'
import './Footer.css'
import footer from '../Assets/logo_big.png'
import insta from '../Assets/instagram_icon.png'
import pintester from '../Assets/pintester_icon.png'
import wattsapp from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={footer} alt="" />
            <p>SHOPIFY</p>
        </div>
        <div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={insta} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pintester} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={wattsapp} alt="" />
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright &copy; {new Date().getFullYear()} - All Right Reserved to Tamilarasan M</p>
        </div>
    </div>
  )
}

export default Footer