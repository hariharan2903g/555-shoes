import "./NewArrivals.css";
import "./TrendingProducts.css";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveScrollAndNavigate } from "../utils/navigation";
import { showToast } from "../utils/toast";

function TrendingProducts({
  trendingProducts,
}) {

  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const pages = [];

  for (let i = 0; i < trendingProducts.length; i += 4) {
    pages.push(trendingProducts.slice(i, i + 4));
  }

  useEffect(() => {

    if (pages.length <= 1) return;

    const interval = setInterval(() => {

      setPage((prev) =>
        prev === pages.length - 1 ? 0 : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [pages.length]);

  return (

    <section className="trending-section">

      <div className="section-header">

        <h2>Trending 🔥 </h2>

      </div>

      <div className="trending-slider">

  <div
    className="trending-track"
    style={{
      transform: `translateX(-${page * 100}%)`
    }}
  >

    {pages.map((group, pageIndex) => (

      <div
        className="trending-page"
        key={pageIndex}
      >

        {group.map((item) => {

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
                  ((item.original_price -
                    item.selling_price) /
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

                <span className="hot-arrival-badge">
                  🔥
                </span>

                <button
                  className={`arrival-heart ${
                    isWishlisted
                      ? "active"
                      : ""
                  }`}
                  onClick={toggleWishlist}
                >
                  {isWishlisted
                    ? <FaHeart />
                    : <FiHeart />}
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

                  {discount > 0 && (
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

    ))}

  </div>

</div>

      <div className="scroll-controls">

        <button
          onClick={() =>
            setPage(
              page === 0
                ? pages.length - 1
                : page - 1
            )
          }
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() =>
            setPage(
              page === pages.length - 1
                ? 0
                : page + 1
            )
          }
        >
          <FaChevronRight />
        </button>

      </div>

    </section>

  );

}

export default TrendingProducts;