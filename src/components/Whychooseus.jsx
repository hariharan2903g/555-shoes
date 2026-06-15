import {FaCheckCircle,FaRulerCombined,FaTruck,} from "react-icons/fa";
function Whychooseus() {
  return (
    <section className="section">
      <h2>Why Choose Us</h2>

      <div className="features">

        <div className="feature-card">
        <div className="feature-icon">✅</div>

          <h3>Quality Assured</h3>

          <p>
            Genuine products carefully selected and
            quality-checked before reaching you.
          </p>
        </div>

        <div className="feature-card">
        <div className="feature-icon">🚚</div>
          <h3>Free & Fast Delivery</h3>
          <p>Free delivery across India on orders above ₹2300 with quick and reliable shipping.</p>
        </div>

        <div className="feature-card">
        <div className="feature-icon">📏</div>
          <h3>Easy Size Exchange</h3>

          <p>
            If the size doesn't fit, we'll help you
            exchange it for the right one.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Whychooseus;