import { useParams, useNavigate, } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import logo from "../assets/555logo.png";
import { Link } from "react-router-dom";
import { FiShare2, FiHeart  } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function ProductPage({setCartOpen}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [recentProducts,setRecentProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {

    const viewed =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];
  
    setRecentProducts(viewed);
  
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
  
    const wishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];
  
    const exists = wishlist.some(
      (item) => item.id === product.id
    );
  
    setWishlisted(exists);
  
  }, [product]);

  useEffect(() => {

    if (!product) return;
  
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];
  
    const exists = cart.some(
      (item) => item.id === product.id
    );
  
    setAddedToCart(exists);
  
  }, [product]);
  

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
        fetchRecommendations(data);

        const viewed =
          JSON.parse(
            localStorage.getItem(
              "recentlyViewed"
            )
          ) || [];
      
        const filtered = viewed.filter(
          (item) => item.id !== data.id
        );
      
        filtered.unshift(data);
      
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify(
            filtered.slice(0, 6)
          )
        );
        setRecentProducts(
          filtered.slice(0, 6)
        );
      }

      setLoading(false);
      }
  

      async function fetchRecommendations(
        currentProduct
      ) {
        const { data, error } =
          await supabase
            .from("products")
            .select("*")
            .eq(
              "category",
              currentProduct.category
            );
      
        if (!error) {
          const filtered = data
            .filter(
              (item) =>
                item.id !== currentProduct.id
            )
            .slice(0, 4);
      
          setRecommendedProducts(
            filtered
          );
        }
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


    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    
    if (existingItem) {
    
      existingItem.quantity += quantity;
    
    } else {
    
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    
    }
  

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  
  window.dispatchEvent(
    new Event("cartUpdated")
  );
  setAddedToCart(true);
}

// Wishlist function

function toggleWishlist() {

  const wishlist =
    JSON.parse(
      localStorage.getItem("wishlist")
    ) || [];

  const exists = wishlist.some(
    (item) => item.id === product.id
  );

  if (exists) {

    const updatedWishlist =
      wishlist.filter(
        (item) =>
          item.id !== product.id
      );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    setWishlisted(false);

  } else {

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    setWishlisted(true);

  }
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
          <div className="breadcrumb">

<span
  onClick={() => navigate("/")}
>
  Home
</span>

<span> › </span>

<span
  onClick={() =>
    navigate(
      `/category/${product.category.toLowerCase()}`
    )
  }
>
  {product.category}
</span>

<span> › </span>

<span>{product.name}</span>

</div>
        <div className="product-top-row">

        <Link
          to={`/brand/${product.brand.toLowerCase()}`}
          className="product-brand clickable-brand"
        >
          {product.brand}
        </Link>

        <div className="product-actions">

        <button
          className="icon-btn"
          onClick={() => {

            if (navigator.share) {

              navigator.share({
                title: product.name,
                text: product.name,
                url: window.location.href,
              });

            } else {

              navigator.clipboard.writeText(
                window.location.href
              );

              alert(
                "Product link copied!"
              );
            }
          }}
        >
          <FiShare2 />
        </button>
          <button
              className="icon-btn"
              onClick={toggleWishlist}
            >
              {wishlisted ? (
                <FaHeart className="filled-heart" />
              ) : (
                <FiHeart />
              )}
            </button>

        </div>

</div>

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

            {/* <p className="product-page-category">
              
              <strong>Category:</strong> {product.category}
            </p> */}
  
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
         
            <button className={ addedToCart
                  ? "view-cart-btn"
                  : "add-cart-btn"
              }   onClick={() => {
              if (addedToCart) {
                setCartOpen(true);
                return;
              }

              addToCart();
            }}
          >
            {addedToCart
              ? "View Cart"
              : "Add To Bag"}
          </button>
  
          <div className="product-benefits">
            <div className="benefit-item">
              <span>✅</span>
              <p>100% Authentic</p>
            </div>

            <div className="benefit-item">
              <span>🚚</span>
              <p>Free shipping over ₹2,000</p>
            </div>

            <div className="benefit-item">
              <span>🔁</span>
              <p>Easy Size Replacements</p>
            </div>

            <div className="benefit-item">
              <span>📦</span>
              <p>Same-day dispatch</p>
            </div>
          </div>
          </div>
  
        </div>
  
      </section>
  
      <section className="section">

      <h2>Recently Viewed</h2>

      <div className="product-grid">

      {recentProducts
      .filter(
      (item) => item.id !== product.id
      )
      .map((item) => (

      <div
      key={item.id}
      className="product-card"
      onClick={() =>
        navigate(`/product/${item.id}`)
        }
      >

      <img
      src={item.image_url}
      alt={item.name}
      />

      <div className="product-info">

      <h3>{item.name}</h3>

      <p>₹{item.price}</p>

      </div>

      </div>

      ))}

      </div>

      </section>
 
      <section className="section">

  <h2>You May Also Like</h2>

  <div className="you-may-like-grid">

    {recommendedProducts.map(
      (item) => (

      <div
        key={item.id}
        className="product-card"
        onClick={() =>
          navigate(
            `/product/${item.id}`
          )
        }
      >

        <img
          src={item.image_url}
          alt={item.name}
        />
       
        <div className="product-info">

          <h3>{item.name}</h3>

          <p>₹{item.price}</p>

        </div>

      </div>
    ))}

  </div>

</section>


      <Footer />
  
    </div>
  );
}

export default ProductPage;