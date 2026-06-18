import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function CheckoutPage() {
    const navigate = useNavigate();
    const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      alternatePhone: "",
  
      house: "",
      street: "",
      area: "",
  
      city: "",
      state: "",
      pincode: "",
    });

    const [cart, setCart] = useState([]);
    const [shipping, setShipping] = useState(0);
    const freeShippingLimit = 2000;

    useEffect(() => {

        const savedCart =
          JSON.parse(
            localStorage.getItem("cart")
          ) || [];
      
        setCart(savedCart);
      
      }, []);

      const subtotal = cart.reduce(
        (sum, item) =>
          sum +
          Number(
            String(item.price).replace(
              /[^\d]/g,
              ""
            )
          ) *
            item.quantity,
        0
      );

    //   pincode and cost

      useEffect(() => {

        const pincode =
          formData.pincode;
      
        if (
          subtotal >= freeShippingLimit
        ) {
          setShipping(0);
          return;
        }
      
        if (
          pincode.startsWith("600")
        ) {
          setShipping(50);
        }
      
        else if (
          pincode.startsWith("6")
        ) {
          setShipping(80);
        }
      
        else if (
          /^\d{6}$/.test(pincode)
        ) {
          setShipping(100);
        }
      
        else {
          setShipping(0);
        }
      
      }, [
        formData.pincode,
        subtotal,
      ]);

      const total = subtotal + shipping;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

//   order placement function

  const placeOrder = () => {

    if (
      !formData.name ||
      !formData.phone ||
      !formData.house ||
      !formData.street ||
      !formData.area ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }
  
    const products = cart
      .map(
        (item) => `
  ${item.name}
  Size: ${item.size || "-"}
  Color: ${item.color || "-"}
  Qty: ${item.quantity}
  Price: ₹${item.price}
  `
      )
      .join("\n");
  
    const message = `
  🛒 NEW ORDER - 555 SHOES
  
  Customer Name:
  ${formData.name}
  
  Phone:
  ${formData.phone}
  
  Alternate Phone:
  ${formData.alternatePhone || "Not Provided"}
  
  Address:
  
  ${formData.house}
  ${formData.street}
  ${formData.area}
  ${formData.city}
  ${formData.state}
  ${formData.pincode}
  
  ---------------------
  
  PRODUCTS
  
  ${products}
  
  ---------------------
  
  Subtotal: ₹${subtotal}
  
  Shipping: ${
    shipping === 0
      ? "FREE"
      : `₹${shipping}`
  }
  
  Total: ₹${total}
  `;
  
    window.open(
      `https://wa.me/917868905884?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };


  return (
    <>
    
   
            <div className="checkout-page">

        <div className="checkout-top">

            <button
            className="checkout-back"
            onClick={() => navigate(-1)}
            >
            ←
            </button>

            <h1>Checkout</h1>

        </div>

        <div className="checkout-form">
      <h2>Contact Details</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
        name="alternatePhone"
        placeholder="Alternate Mobile Number (Optional)"
        onChange={handleChange}
        />

<h2>Delivery Address</h2>

<input
  name="house"
  placeholder="House / Flat No"
  onChange={handleChange}
/>

<input
  name="street"
  placeholder="Street Address"
  onChange={handleChange}
/>

<input
  name="area"
  placeholder="Area / Locality"
  onChange={handleChange}
/>

<input
  name="city"
  placeholder="City"
  onChange={handleChange}
/>

<input
  name="state"
  placeholder="State"
  onChange={handleChange}
/>

<input
  name="pincode"
  placeholder="Pincode"
  onChange={handleChange}
/>

        <div className="checkout-summary">
                    {cart.map((item) => (

            <div
            key={item.id}
            className="checkout-product"
            >

                <h3>{item.name}</h3>

                <p>
                Size: {item.size || "-"}
                </p>

                <p>
                Color: {item.color || "-"}
                </p>

                <p>
                Qty: {item.quantity}
                </p>

            </div>

            ))}
        <h2>
        Order Summary
        </h2>

        <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
        <span>Shipping</span>

        <span>
            {shipping === 0 &&
            subtotal >= freeShippingLimit
            ? "FREE 🚚"
            : `₹${shipping}`}
        </span>
        </div>

        {subtotal <
        freeShippingLimit && (
        <p className="shipping-message">

            Add ₹
            {freeShippingLimit -
            subtotal}
            {" "}more to get FREE
            shipping 🚚

        </p>
        )}

        <div className="summary-row total-row">
        <strong>Total</strong>

        <strong>
            ₹{total}
        </strong>
        </div>

        </div>

        <button
        className="place-order-btn"
        onClick={placeOrder}
        >
        Order On WhatsApp
        </button>

            </div> {/* checkout-form */}

</div> {/* checkout-page */}

<Footer />
            </>
        );
        }

        export default CheckoutPage;