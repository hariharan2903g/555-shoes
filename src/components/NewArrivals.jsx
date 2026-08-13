import "./NewArrivals.css";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveScrollAndNavigate } from "../utils/navigation";
import { showToast } from "../utils/toast";

function NewArrivals({
  newArrivals,
  
}) {

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const navigate = useNavigate();

  return (
    <section className="section">

      <h2>New Arrivals</h2>

      <div className="arrival-slider">
        <div className="arrival-track">

          {newArrivals.map((item) => {

            const isWishlisted = wishlist.some(
              (p) => p.id === item.id
            );

            const toggleWishlist = (e) => {
              e.stopPropagation();

              let updated;

              if (isWishlisted) {
                updated = wishlist.filter(
                  (p) => p.id !== item.id
                );
              } else {
                updated = [...wishlist, item];
              }

              setWishlist(updated);

              localStorage.setItem(
                "wishlist",
                JSON.stringify(updated)
              );

              window.dispatchEvent(
                new Event("wishlistUpdated")
              );
              if (isWishlisted) {
                showToast("Removed from Wishlist");
            } else {
                showToast("Added to Wishlist ❤️");
            }

            };

            const discount =
              item.original_price > item.selling_price
                ? Math.round(
                    ((item.original_price - item.selling_price) /
                      item.original_price) *
                      100
                  )
                : 0;

            return (
              <div
                key={item.id}
                className="arrival-card"
                onClick={() =>
                  saveScrollAndNavigate(
                    navigate,
                    `/product/${item.id}`
                  )
                }
              >

                <div className="arrival-image">

                  <span className="arrival-badge">
                    NEW
                  </span>

                  <button
                    className={`arrival-heart ${
                      isWishlisted ? "active" : ""
                    }`}
                    onClick={toggleWishlist}
                  >
                    {isWishlisted ? <FaHeart /> : <FiHeart />}
                  </button>

                  <img
                    src={item.colors?.[0]?.images?.[0]?.url}
                    alt={item.product_name}
                  />

                </div>

                <div className="arrival-info">

                  <h3>{item.product_name}</h3>

                  <p>{item.brand}</p>

                  <div className="arrival-pricing">

                    <span className="selling-price">
                      ₹{item.selling_price.toLocaleString("en-IN")}
                    </span>

                    {item.original_price >
                      item.selling_price && (
                      <>
                        <span className="original-price">
                          ₹{item.original_price.toLocaleString("en-IN")}
                        </span>

                        <span className="discount">
                          {discount}% OFF
                        </span>
                      </>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>

    </section>
  );
}

export default NewArrivals;