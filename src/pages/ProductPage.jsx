import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import logo from "../assets/555logo.png";

function ProductPage({setCartOpen}) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    setLoading(true);
  
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
  
    setLoading(false);
  }
  const sizes = product?.sizes
  ? product.sizes.split(",")
  : [];

  const colors = product?.colors
  ? product.colors.split(",")
  : [];


function addToCart() {

  // if (!selectedSize) {
  //   alert("Please select a size");
  //   return;
  // }

  // if (!selectedColor) {
  //   alert("Please select a color");
  //   return;
  // }

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image_url,
    size: selectedSize,
    color: selectedColor,
    quantity,
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  
  window.dispatchEvent(
    new Event("cartUpdated")
  );
    alert("Added to cart");
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
    <div className="product-page-container">
      <Header  
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      setCartOpen={setCartOpen}
      />

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
            <h3>Color</h3>

            <div className="color-options">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-circle ${
                    selectedColor === color
                      ? "selected-color"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color.trim(),
                  }}
                  onClick={() =>
                    setSelectedColor(color)
                  }
                />
              ))}
            </div>
  
            <div className="product-page-divider"></div>
                <h3>Size</h3>

                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSize === size
                          ? "selected-size"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>

            <p className="product-page-category">
              
              <strong>Category:</strong> {product.category}
            </p>
  
            <div className="product-page-divider"></div>
            <h3>Quantity</h3>

            <div className="quantity-selector">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>
            <h3>Description</h3>
  
            <p className="product-page-description">
              {product.description}
            </p>
            <button
            className="add-cart-btn"
            onClick={addToCart}
          >
            Add To Cart
          </button>
          
  
          </div>
  
        </div>
  
      </section>
  
      <Footer />
  
    </div>
  );
}

export default ProductPage;