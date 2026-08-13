import { useNavigate } from "react-router-dom";
import banner from "../assets/shipping-banner.png";
import "./DiscountBanner.css";

function DiscountBanner() {
  const navigate = useNavigate();

  return (
    <section className="home-discount-banner">

      <img
        src={banner}
        alt="Free Shipping"
        className="home-discount-image"
      />

      <button
        className="home-discount-btn"
        onClick={() => navigate("/products")}
      >
        Shop Collection 
      </button>

    </section>
  );
}

export default DiscountBanner;