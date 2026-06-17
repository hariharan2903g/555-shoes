import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function WishlistPage({ setCartOpen }) {
  const navigate = useNavigate();

  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    setWishlist(savedWishlist);

  }, []);

  return (
    <div className="wishlist-page">

      <Header
        setCartOpen={setCartOpen}
      />
      <main className="wishlist-content">

      <section className="section">

        <h1>My Wishlist</h1>

        {wishlist.length === 0 && (
        <p className="empty-wishlist">
          Your wishlist is empty
        </p>
      )}

        <div className="category-products-grid">

          {wishlist.map((product) => (

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

              </div>

            </div>

          ))}

        </div>

      </section>
      </main>
      <Footer />

    </div>
  );
}

export default WishlistPage;