import logo from "../assets/555logo.png";
import { useEffect,useState } from "react";
import {FaInstagram,FaWhatsapp,}from "react-icons/fa";
import {FiSearch,FiShoppingBag} from "react-icons/fi";
import { Link } from "react-router-dom";

function Header({menuOpen = false,
  setMenuOpen = () => {},
  scrolled = false,
  setCartOpen = () => {},
})
 {
  const [cartCount, setCartCount] = useState(0);
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

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];
  
      setCartCount(cart.length);
    };
  
    updateCartCount();
  
    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );
  
    return () =>
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
  }, []);

  
    return (
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
    <div className="header-left">

    <Link to="/"className="logo-link">
<div
  className={`logo-container ${scrolled ? "logo-left" : ""}`}>
  <img
    src={logo}
    alt="555 Shoes Logo"
    className="logo"
  />

  <h1 className={scrolled ? "hide-title" : ""}>
    555 SHOES
  </h1>
</div>
 </Link>
<nav
  className={`desktop-nav ${
    scrolled ? "desktop-nav-scrolled" : ""
  }`}
>
  <Link to="/category/shoes">Shoes</Link>
  <Link to="/category/slides">Slides</Link>
  <Link to="/category/crocs">Crocs</Link>
  <Link to="/category/Flip-Flops">Sandals</Link>
  <Link to="/category/watches">Watches</Link>
  <Link to="/category/accessories">Accessories</Link>
</nav>

</div>

<div className="header-icons">
<FiSearch className="header-icon" />

<div
  className="bag-link"
  
  onClick={() =>setCartOpen(true) 
    }
>  
<div className="bag-wrapper">

    <FiShoppingBag
      className="header-icon"/>

    {cartCount > 0 && (
      <span className="cart-badge">
        {cartCount}
      </span>
    )}

  </div>
</div>

<div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
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

<Link to="/category/shoes"onClick={() => setMenuOpen(false)}>Shoes</Link>

<Link to="/category/slides"onClick={() => setMenuOpen(false)}>Slides</Link>

<Link to="/category/crocs"onClick={() => setMenuOpen(false)}>Crocs</Link>

<Link to="/category/FlipFlops"onClick={() => setMenuOpen(false)}>Sandals</Link>

<Link to="/category/watches"onClick={() => setMenuOpen(false)}>Watches</Link>

<Link to="/category/accessories"onClick={() =>setMenuOpen(false)}>Accessories</Link>

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