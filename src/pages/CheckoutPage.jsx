import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";import Footer from "../components/Footer";
import { calculateShipping } from "../utils/shipping";

function CheckoutPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [shipping, setShipping] = useState(0);
    const [delivery, setDelivery] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);
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

      useEffect(() => {

        if (!selectedAddress) return;
    
        const result = calculateShipping(
            subtotal,
            selectedAddress.pincode
        );
    
        setShipping(result.shipping);
    
        setDelivery(result.delivery);
    
    }, [subtotal, selectedAddress]);



    useEffect(() => {

      const loadAddress = () => {
  
          const addresses =
              JSON.parse(localStorage.getItem("addresses")) || [];
  
          const selected =
              addresses.find(address => address.selected);
  
          setSelectedAddress(selected || null);
  
      };
  
      loadAddress();
  
      window.addEventListener(
          "focus",
          loadAddress
      );
  
      return () =>
          window.removeEventListener(
              "focus",
              loadAddress
          );
  
  }, []);

    //   pincode and cost

   

      const total = subtotal + shipping;

  

//   order placement function

  const placeOrder = () => {

    if (!selectedAddress) {

      alert("Please select a delivery address");
  
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
  🛒 NEW ORDER - SkookS
  
 Customer Name:
${selectedAddress.name}
  
  Phone:
  ${selectedAddress.phone}
  
  Alternate Phone:
  ${selectedAddress.alternatePhone || "Not Provided"}
  
  Address:
  
  ${selectedAddress.house}
  ${selectedAddress.street}
  ${selectedAddress.area}
  ${selectedAddress.city}
  ${selectedAddress.state}
  ${selectedAddress.pincode}
  
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
      
        <div className="checkout-address">

<div className="checkout-address-header">

    <h3>Delivery Address</h3>

    <button
        onClick={() => navigate("/address")}
    >
        Change
    </button>

</div>

{selectedAddress ? (

    <>

        <strong>
            {selectedAddress.name}
        </strong>

        <p>

            {selectedAddress.house},

            {" "}

            {selectedAddress.street},

            {" "}

            {selectedAddress.area}

        </p>

        <p>

            {selectedAddress.city}

            {" - "}

            {selectedAddress.pincode}

        </p>

        <p>

            {delivery}

        </p>

    </>

) : (

    <button
        className="add-address-checkout"
        onClick={() => navigate("/address")}
    >
        + Add Address
    </button>

)}

</div>


        <div className="checkout-summary">
        {cart.map((item) => (

            <div
            key={item.id}
            className="checkout-product"
            >

            <div className="checkout-product-info">

            <h3>{item.name}</h3>

            <p>Size: {item.size || "-"}</p>

            <p>Color: {item.color || "-"}</p>

            <p>Qty: {item.quantity}</p>

            <p>Price: ₹{item.price}</p>

            </div>

            <img
            src={item.image}
            alt={item.name}
            className="checkout-product-image"
            />

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


            </>
        );
        }

        export default CheckoutPage;