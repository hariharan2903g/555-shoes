import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrdersPage.css";

function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleGetOrder = (e) => {
    e.preventDefault();

    // Logic will be added later
    console.log("Order ID:", orderId);
    console.log("Phone:", phone);
  };

  return (
    <div className="orders-page">
        <button
  className="orders-back-btn"
  onClick={() => navigate(-1)}
>
  ←
</button>

      <div className="orders-header">
        <div className="orders-icon">📦</div>

        <h1>Track Your Order</h1>

        <p>
          Enter your order details to view the latest status
          of your order.
        </p>
      </div>

      <form
        className="orders-form"
        onSubmit={handleGetOrder}
      >

        <div className="orders-field">
          <label>Order ID</label>

          <input
            type="text"
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>

        <div className="orders-field">
          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="orders-submit-btn"
        >
          Get My Order
          <span>→</span>
        </button>

      </form>

      <div className="orders-info">
        <span>🔒</span>

        <p>
          Your order details are securely linked to
          your order ID and mobile number.
        </p>
      </div>

    </div>
  );
}

export default OrdersPage;