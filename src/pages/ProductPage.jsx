import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setProduct(data);
    }
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="product-page">
      <div className="product-page-card">
  
        <img
          src={product.image_url}
          alt={product.name}
          className="product-page-image"
        />
  
        <div className="product-page-details">
  
          <h1>{product.name}</h1>
  
          <p className="product-page-price">
            MRP: ₹{product.price}
          </p>
  
          <div className="product-page-divider"></div>
  
          <p className="product-page-category">
            <strong>Category:</strong> {product.category}
          </p>
  
          <div className="product-page-divider"></div>
  
          <h3>Description</h3>
  
          <p className="product-page-description">
            {product.description}
          </p>
  
          <a
            href="https://wa.me/917868905884"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            WhatsApp Enquiry
          </a>
  
        </div>
      </div>
      <Contact />
  <Footer />
    </section>
  );
}

export default ProductPage;