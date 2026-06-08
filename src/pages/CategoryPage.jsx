import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  async function fetchCategoryProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("category", category);

    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  return (
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
      <Contact />
  <Footer />
    </section>
    
  );
}

export default CategoryPage;