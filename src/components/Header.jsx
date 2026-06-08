import logo from "../assets/555logo.png";
import { useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Header({menuOpen,setMenuOpen,scrolled,}) {
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);
    return (
      <header
        className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-container">
          <img
            src={logo}
            alt="555 Shoes Logo"
            className="logo"
          />
  
          <h1 className={scrolled ? "hide-title" : ""}>
            555 SHOES
          </h1>
        </div>
  
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
        {menuOpen && (
  <div
    className="menu-overlay"
    onClick={() => setMenuOpen(false)}>
   </div>
    )}
  
        <nav className={menuOpen ? "navbar active" : "navbar"}>
        <div className="menu-header">
  <img src={logo} alt="logo" />

  <button
    className="menu-close"
    onClick={() => setMenuOpen(false)}
  >
    ✕
  </button>
</div>

  <a href="#">Shoes</a>
  <a href="#">Slides</a>
  <a href="#">Crocs</a>
  <a href="#">Sandals</a>
  <a href="#">Watches</a>
  <a href="#">Sale</a>
  <a href="#">Help</a>
  <a href="#">Contact</a>

  <div className="menu-socials">
  <a
    href="https://instagram.com/555_shoes_online"
    target="_blank"
    rel="noreferrer"
  >
    <FaInstagram /></a>

  <a
    href="https://wa.me/917868905884"
    target="_blank"
    rel="noreferrer"
  >
    <FaWhatsapp />  </a>
</div>
</nav>
      </header>
    );
  }
  
  export default Header;