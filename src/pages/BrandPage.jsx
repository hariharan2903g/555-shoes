import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
function BrandPage({setCartOpen}) {
  const { brand } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [brand]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("brand", brand);

    if (!error) {
      setProducts(data);
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 80);
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);
}, []);



  return (
    <section className="section">
      <Header
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  scrolled={scrolled}
  setCartOpen={setCartOpen}
/>
      <h2>{brand.toUpperCase()}</h2>

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

      <Footer />
    </section>
  );
}

export default BrandPage;