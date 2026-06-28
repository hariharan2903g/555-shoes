import logo from "../assets/555logo.png";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({
  menuOpen = false,
  setMenuOpen = () => {},
  scrolled = false,
  setCartOpen = () => {},
}) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

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
    const updateCounts = () => {
      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const wishlist =
        JSON.parse(
          localStorage.getItem("wishlist")
        ) || [];

        setCartCount(

          cart.reduce(
        
            (total, item) => total + item.quantity,
        
            0
        
          )
        
        );
      setWishlistCount(wishlist.length);
    };

    updateCounts();

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
    };
  }, []);

  return (
    <header
      className={`header ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="header-left">
        <Link
          to="/"
          className="logo-link"
        >
          <div
            className={`logo-container ${
              scrolled
                ? "logo-left"
                : ""
            }`}
          >
            <img
              src={logo}
              alt="555 Shoes Logo"
              className="logo"
            />

            <h1
              className={
                scrolled
                  ? "hide-title"
                  : ""
              }
            >
             555shoes.in
            </h1>
          </div>
        </Link>

        <nav
          className={`desktop-nav ${
            scrolled
              ? "desktop-nav-scrolled"
              : ""
          }`}
        >
          <Link to="/category/shoes">
            Shoes
          </Link>

          <Link to="/category/slides">
            Slides
          </Link>

          <Link to="/category/crocs">
            Crocs
          </Link>

          <Link to="/category/Flip-Flops">
            Sandals
          </Link>

          <Link to="/category/watches">
            Watches
          </Link>

          <Link to="/category/accessories">
            Accessories
          </Link>
        </nav>
      </div>

      <div className="header-icons">
        <FiSearch
          className="header-icon"
          onClick={() =>
            navigate("/search")
          }
        />


        <div
          className="menu-icon"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </div>
      </div>

      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      <nav
        className={
          menuOpen
            ? "navbar active"
            : "navbar"
        }
      >
        <div className="menu-header">
          <img
            src={logo}
            alt="logo"
          />

          <button
            className="menu-close"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            ✕
          </button>
        </div>

        <Link
          to="/category/shoes"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Shoes
        </Link>

        <Link
          to="/category/slides"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Slides
        </Link>

        <Link
          to="/category/crocs"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Crocs
        </Link>

        <Link
          to="/category/FlipFlops"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Sandals
        </Link>

        <Link
          to="/category/watches"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Watches
        </Link>

        <Link
          to="/category/accessories"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Accessories
        </Link>

        

      </nav>
    </header>
  );
}

export default Header;