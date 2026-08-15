import { Link } from "react-router-dom";
import logo from "../assets/skookslogo1.png";
import "./Footer.css";
import whatsapp from "../assets/brands/whatsapp.png";
import phone from "../assets/brands/phone.png";
import instagram from "../assets/brands/insta.png";


function Footer() {
  return (
    <footer className="footer">

      <div className="footer-section">

        <h4 className="footer-title">
          QUICK LINKS
        </h4>
        <div className="footer-content">
        <Link to="/">Home</Link>

        <Link to="/categories">
          Categories
        </Link>

        <Link to="/wishlist">
          Wishlist
        </Link>

        <Link
            to="/customer-care"
            state={{ section: "contact" }}
        >
            Contact Us
        </Link>

      </div>
      </div>

      <div className="footer-section">

        <h4 className="footer-title">
          CUSTOMER CARE
        </h4>
        <div className="footer-content">
        <Link
            to="/customer-care"
            state={{ section: "delivery" }}
        >

            Delivery Information
        </Link>

        <Link

          to="/customer-care"

          state={{ section:"warranty" }}

          >
          Warranty
        </Link>

        <Link
            to="/customer-care"
            state={{ section: "return" }}
        >
            Return & Replacement
        </Link>

        </div>
      </div>


      <div className="footer-section">

        <h4 className="footer-title">
          MORE
        </h4>
        <div className="footer-content">
        <Link
              to="/customer-care"
              state={{ section: "privacy" }}
          >
              Privacy Policy
          </Link>

          <Link
                to="/customer-care"
                state={{ section: "terms" }}
            >
                Terms & Conditions
            </Link>

            <Link
                to="/customer-care"
                state={{ section: "faq" }}
            >
                Frequently Asked Questions
            </Link>
        </div>
      </div>

      <div className="footer-section">

<h4 className="footer-title">
    CONNECT WITH US
</h4>

<div className="footer-social">

    <a
        href="https://wa.me/916383147948"
        target="_blank"
        rel="noreferrer"
    >
        <img src={whatsapp} alt="WhatsApp" />
        <span>WhatsApp</span>
    </a>

    <a
        href="https://instagram.com/skooks.in"
        target="_blank"
        rel="noreferrer"
    >
        <img src={instagram} alt="Instagram" />
        <span>Instagram</span>
    </a>

    <a href="tel:+916383147948">
        <img src={phone} alt="Call" />
        <span>Call us</span>
    </a>

</div>

</div>

      <div className="footer-section">

<h4 className="footer-title">
    FIND US
</h4>

<div className="footer-content">

<p>
        🕒 Available Everyday : <strong>11 AM - 10 PM </strong> 
    </p>

    {/* <p>
        📍 Garage No.19<br />
        28th Cross Street<br />
        Besant Nagar<br />
        Chennai - 600090
    </p> */}

   

</div>

</div>



      {/* <div className="footer-map">
    <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5524890068677!2d80.26728847588005!3d13.000449814243474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b91c1b1adb%3A0x8f09138cfc6dfb2e!2s555%20Shoes!5e0!3m2!1sen!2sin!4v1780142628710!5m2!1sen!2sin" 
            width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
    />
</div> */}

      <div className="footer-brand">

        <img
          src={logo}
          alt="SkookS"
          className="footer-logo"
        />
        <br></br><br></br><br></br>

        <small>
          © 2026 skooks
        </small>

      </div>

    </footer>
  );
}

export default Footer;