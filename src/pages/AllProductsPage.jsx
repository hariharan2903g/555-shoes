import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AllProductsPage({ setCartOpen }) {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [
    products,
    selectedCategory,
    sortBy,
    searchTerm,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (!error) {
      setProducts(data);
    }
  }

  function filterProducts() {

    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
    }

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    if (sortBy === "low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sortBy === "high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );
    }

    setFilteredProducts(result);
  }

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
      />

      <section className="section">

        <h1>All Products</h1>

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

        <div className="filter-bar">

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >
            <option>All</option>
            <option>Shoes</option>
            <option>Crocs</option>
            <option>Slides</option>
            <option>Watches</option>
            <option>Flip-Flops</option>
            <option>Accessories</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >
            <option value="newest">
              Newest First
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

          </select>

        </div>

        <div className="category-products-grid">

          {filteredProducts.map(
            (product) => (
              <div
                key={product.id}
                className="product-category-card"
                onClick={() =>
                  navigate(
                    `/product/${product.id}`
                  )
                }
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                />

                <div className="product-category-info">
                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    ₹{product.price}
                  </p>

                  <button>
                    View Product
                  </button>
                </div>
              </div>
            )
          )}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default AllProductsPage;