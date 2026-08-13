import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/skookslogo.png";
import logo1 from "../assets/skookslogo1.png";
import { saveScrollAndNavigate } from "../utils/navigation";

import "./Header.css";

function Header({
  menuOpen = false,
  setMenuOpen = () => {},
  scrolled = false,
}) {

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (

    <header className="header">

        <button
          className="header-menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        <img
            src={logo}
            alt="Skooks"
            className="header-logo"
            onClick={() =>
              saveScrollAndNavigate(navigate, "/")
            }
            style={{ cursor: "pointer" }}
          />
      

      <button
          className="header-search-btn"
          onClick={() => navigate("/search")}
        >
          <FiSearch />
        </button>

      {menuOpen && (
        <div
          className="header-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`header-drawer ${
          menuOpen ? "open" : ""
        }`}
      >

        <button
          className="header-close-btn"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <img
          src={logo1}
          alt="Skooks"
          className="drawer-logo"
          onClick={() => {
            setMenuOpen(false);
            saveScrollAndNavigate(navigate, "/");
          }}
          style={{ cursor: "pointer" }}
        />

        <nav className="drawer-links">


          <Link to="/products?category=Shoes" onClick={() => setMenuOpen(false)}>
            Shoes
          </Link>

          <Link to="/products?category=Crocs" onClick={() => setMenuOpen(false)}>
            Crocs
          </Link>

          <Link to="/products?category=Watches" onClick={() => setMenuOpen(false)}>
            Watches
          </Link>

          <Link to="/products?category=Sliders" onClick={() => setMenuOpen(false)}>
            Sliders
          </Link>

          <Link to="/products?category=Sandals" onClick={() => setMenuOpen(false)}>
            Sandals
          </Link>

          <Link to="/products?category=Accessories" onClick={() => setMenuOpen(false)}>
            Accessories
          </Link>

        </nav>
       
       
        <div className="drawer-footer">

            <button
              className="footer-help-btn"
              onClick={() => {
                setMenuOpen(false);
                navigate("/customer-care", {
                  state: { section: "contact" },
                });
              }}
            >
              💬 Need Help?
            </button>

          </div>

      </div>

    </header>

  );
}

export default Header;