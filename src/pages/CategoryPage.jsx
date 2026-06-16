import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/555logo.png";

function CategoryPage({setCartOpen}) {

  const { category } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchCategoryProducts();
  }, [category]);

 async function fetchCategoryProducts() {

  setLoading(true);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("category", category);

  if (error) {
    console.error(error);
  } else {
    setProducts(data);
  }

  setLoading(false);
}

if (loading) {
  return (
    <div className="loading-screen">
      <img
        src={logo}
        alt="555 Shoes"
        className="loading-logo"
      />
    </div>
  );
}

 return (
  <div className="category-page">

    <Header
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      scrolled={scrolled}
      setCartOpen={setCartOpen}
    />

    <section className="section">
      <h2 className="category-page-title">
        {category.toUpperCase()}
      </h2>

      <div className="category-products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-category-card"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            <img
              src={product.image_url}
              alt={product.name}
            />

            <div className="product-category-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button>
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <Footer />

  </div>
);
}

export default CategoryPage;