import { useEffect, useState } from "react";

function CartDrawer({
  cartOpen,
  setCartOpen,
}) {
  const [cart, setCart] = useState([]);
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        String(item.price).replace(/[^\d]/g, "")
      ) *
        item.quantity,
    0
  );
  
    useEffect(() => {
    const savedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(savedCart);
  }, [cartOpen]);

  function removeItem(index) {
    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  }

  function increaseQty(index) {
    const updatedCart = [...cart];
  
    updatedCart[index].quantity += 1;
  
    setCart(updatedCart);
  
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  }
  
  function decreaseQty(index) {
    const updatedCart = [...cart];
  
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
  
    setCart(updatedCart);
  
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  }

  const whatsappMessage = cart
    .map(
      (item) =>
        `Product: ${item.name}
Size: ${item.size}
Color: ${item.color}
Qty: ${item.quantity}
Price: ₹${item.price}`
    )
    .join("\n\n");

  return (
    <>
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        />
      )}

      <div
        className={`cart-drawer ${
          cartOpen ? "open" : ""
        }`}
      >
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button
            onClick={() =>
              setCartOpen(false)
            }
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(
              (item, index) => (
                <div
                  key={index}
                  className="cart-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <h4>{item.name}</h4>
                    <p className="cart-price">
                        ₹{item.price}
                      </p>
                    <p>
                      {item.size} •{" "}
                      {item.color}
                    </p>

                    <div className="cart-qty">
                      <button
                        onClick={() => decreaseQty(index)}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(
                        index
                      )
                    }
                    
                  >
                    ✕
                  </button>
                </div>
              )
            )}
            
          <div className="cart-total">
             <h3>Total</h3>
              <h2>₹{total}</h2>
          </div>
            <a
              className="whatsapp-btn"
              href={`https://wa.me/917868905884?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Order On WhatsApp
            </a>
          </>
        )}
      </div>
    </>
  );
}

export default CartDrawer;