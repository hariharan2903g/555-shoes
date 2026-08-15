import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/skookslogo.png";
import logo1 from "../assets/skookslogo1.png";
import { saveScrollAndNavigate } from "../utils/navigation";
import { categories } from "../data/categories";

import "./Header.css";

function Header({
  menuOpen = false,
  setMenuOpen = () => {},
  scrolled = false,
}) {

  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);


  function getSubcategoryUrl(category, item) {

    let url = `/products?gender=All&category=${category}`;
  
    if (category === "Shoes") {
  
      url += `&best_for=${encodeURIComponent(item)}`;
  
    }
  
    else if (category === "Crocs") {
  
      url += `&crocs_type=${encodeURIComponent(item)}`;
  
    }
  
    else if (category === "Watches") {
  
      if (item === "Digital") {
        url += `&display_type=Digital`;
      }
  
      else if (
        item === "Automatic" ||
        item === "Quartz"
      ) {
        url += `&movement=${encodeURIComponent(item)}`;
      }
  
      else {
        url += `&material=${encodeURIComponent(
          item === "Metal"
            ? "Stainless Steel"
            : item
        )}`;
      }
  
    }
  
    else if (
      category === "Sliders" ||
      category === "Sandals" ||
      category === "Accessories"
    ) {
  
      url = `/products?gender=All&category=${encodeURIComponent(item)}`;
  
    }
  
    return url;
  }





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

  {Object.keys(categories).map((category) => (

    <div
      key={category}
      className="drawer-category"
    >

      <button
        className="drawer-category-btn"
        onClick={() =>
          setExpandedCategory(
            expandedCategory === category
              ? null
              : category
          )
        }
      >

        <span>{category}</span>

        <span
          className={`drawer-category-arrow ${
            expandedCategory === category
              ? "expanded"
              : ""
          }`}
        >
          ›
        </span>

      </button>


      {expandedCategory === category && (

        <div className="drawer-subcategories">

          {categories[category].map((item) => (

            <Link
              key={item}
              to={getSubcategoryUrl(
                category,
                item
              )}
              onClick={() => {
                setMenuOpen(false);
                setExpandedCategory(null);
              }}
            >
              {item}
            </Link>

          ))}

        </div>

      )}

    </div>

  ))}

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