import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateShipping } from "../utils/shipping";
import AddressSheet from "./AddressSheet";
import { IoChevronBack } from "react-icons/io5";
import { FiHeart, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useRef } from "react";

function CartDrawer({
  cartOpen,
  setCartOpen,
}) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);


  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        String(item.price).replace(/[^\d]/g, "")
      ) *
        item.quantity,
    0
  );

  const itemRefs = useRef({});
  const freeShippingLimit = 2000;
  const [addresses, setAddresses] = useState([]);
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);
  const [reopenAddressSheet, setReopenAddressSheet] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistBounce, setWishlistBounce] = useState(false);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [removingKey, setRemovingKey] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [animatingQty, setAnimatingQty] = useState("");
  const [animatingButton, setAnimatingButton] = useState("");

const address =
    addresses.find(address => address.selected);
const result = calculateShipping(
  subtotal,
  address?.pincode || ""
);




  const remaining = freeShippingLimit - subtotal;

  const shippingCharge =

    subtotal >= freeShippingLimit

        ? 0

        : Number(
              String(result.shipping)
                  .replace(/[^\d]/g, "")
          ) || 0;

const grandTotal = subtotal + shippingCharge;
  
    useEffect(() => {
     
      const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
      
      setCart(savedCart);
      
      const savedAddresses =
      JSON.parse(localStorage.getItem("addresses")) || [];
      
      savedAddresses.sort((a,b)=>{
      
          if(a.selected && !b.selected) return -1;
      
          if(!a.selected && b.selected) return 1;
      
          return 0;
      
      });
      
      setAddresses(savedAddresses);
      
  }, [cartOpen]);

  

useEffect(() => {

  function updateWishlist() {

      const wishlist =
          JSON.parse(
              localStorage.getItem("wishlist")
          ) || [];

      setWishlistCount(
          wishlist.length
      );

      setWishlistBounce(true);

      setTimeout(() => {

          setWishlistBounce(false);

      }, 500);

  }
  updateWishlist();

  window.addEventListener(
      "wishlistUpdated",
      updateWishlist
  );

  return () => {

      window.removeEventListener(
          "wishlistUpdated",
          updateWishlist
      );

  };

}, []);



useEffect(() => {
    if (!cartOpen) return;
  
    const scrollY = window.scrollY;
  
    document.documentElement.style.overflow = "hidden";
  
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  
    return () => {
      document.documentElement.style.overflow = "";
  
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
  
      window.scrollTo(0, scrollY);
    };
  }, [cartOpen]);


useEffect(() => {

  function handleAddressUpdated() {

    const saved =
        JSON.parse(
            localStorage.getItem("addresses")
        ) || [];

    saved.sort((a,b)=>{

        if(a.selected && !b.selected) return -1;

        if(!a.selected && b.selected) return 1;

        return 0;

    });

    setAddresses(saved);

    setCartOpen(true);

    // setAddressSheetOpen(true);

}

  window.addEventListener(
      "addressUpdated",
      handleAddressUpdated
  );

  return () => {

      window.removeEventListener(
          "addressUpdated",
          handleAddressUpdated
      );

  };

}, []);

useEffect(() => {

  function refreshAddresses() {

      const saved =
          JSON.parse(
              localStorage.getItem("addresses")
          ) || [];

      saved.sort((a, b) => {

          if (a.selected && !b.selected) return -1;

          if (!a.selected && b.selected) return 1;

          return 0;

      });

      setAddresses(saved);

  }

  window.addEventListener(
      "focus",
      refreshAddresses
  );

  return () => {

      window.removeEventListener(
          "focus",
          refreshAddresses
      );

  };

}, []);

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

function showToast(message) {

  setToast(message);

  setTimeout(() => {

      setToast("");

  }, 2000);

}

// function removeItem(index) {

//   const firstPositions = {};

//   cart.forEach(item => {

//       const key =
//           `${item.id}-${item.size}-${item.color}`;

//       const element =
//           itemRefs.current[key];

//       if (element) {

//           firstPositions[key] =
//               element.getBoundingClientRect().top;

//       }

//   });

//   const updatedCart = [...cart];

//   updatedCart.splice(index, 1);

//   setCart(updatedCart);

//   localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//   );

//   window.dispatchEvent(
//       new Event("cartUpdated")
//   );

//   requestAnimationFrame(() => {

//       updatedCart.forEach(item => {

//           const key =
//               `${item.id}-${item.size}-${item.color}`;

//           const element =
//               itemRefs.current[key];

//           if (!element) return;

//           const last =
//               element.getBoundingClientRect().top;

//           const first =
//               firstPositions[key];

//           const delta =
//               first - last;

//           if (!delta) return;

//           element.style.transition = "none";

//           element.style.transform =
//               `translateY(${delta}px)`;

//           requestAnimationFrame(() => {

//               element.style.transition =
//                   "transform .45s cubic-bezier(.22,1,.36,1)";

//               element.style.transform =
//                   "translateY(0)";

//           });

//       });

//   });

// }

  function moveToWishlist(item, index) {

    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    // Prevent duplicates
    const exists = wishlist.some(
        product =>
            product.id === item.id &&
            product.size === item.size &&
            product.color === item.color
    );

    if (!exists) {

        wishlist.push(item);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        window.dispatchEvent(
            new Event("wishlistUpdated")
        );
    }

    removeItem(index);

    showToast("❤️ Moved to Wishlist");
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

  const key =
      `${updatedCart[index].id}-${updatedCart[index].size}-${updatedCart[index].color}`;

      setAnimatingQty(key);

      setAnimatingButton(`${key}-plus`);

  setTimeout(() => {

    setAnimatingQty("");
    setAnimatingButton("");

  }, 220);

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

    const key =
    `${updatedCart[index].id}-${updatedCart[index].size}-${updatedCart[index].color}`;

    setAnimatingQty(key);

    setAnimatingButton(`${key}-minus`);

    setTimeout(() => {

      setAnimatingQty("");
      setAnimatingButton("");

}, 220);
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

<button
    className="cart-back-btn"
    onClick={() => setCartOpen(false)}
>
    <IoChevronBack />
</button>

<div className="cart-header-title">

        <h2>
            YOUR BAG ({cart.length})
        </h2>

        <p className="cart-header-message">

            {subtotal >= freeShippingLimit
                ? "🎉 Free Shipping Unlocked"
                : `₹${remaining} away from FREE Shipping`}

        </p>

    </div>

<button
    className={`wishlist-btn ${
        wishlistBounce
            ? "wishlist-pop"
            : ""
    }`}
    onClick={() => {

      setCartOpen(false);

        navigate("/wishlist");

    }}
>

<FiHeart
    className={
        wishlistBounce
            ? "wishlist-heart-pop"
            : ""
    }
/>

    <span className="wishlist-count">
        {wishlistCount}
    </span>

</button>

</div>
       

        {cart.length === 0 ? (
          <div className="empty-cart">

          <div className="empty-cart-icon">
              🛍️
          </div>
      
          <h2>Your Bag is Empty</h2>
      
          <p>
      
              Looks like you haven't added
              anything yet.
      
          </p>
      
          <button
            className="continue-shopping-btn"
            onClick={() => {

                setCartOpen(false);

                navigate("/products");

            }}
        >

            Continue Shopping

        </button>

              <button
          className="wishlist-empty-btn"
          onClick={() => {

              setCartOpen(false);

              navigate("/wishlist");

          }}
      >

          View Wishlist

      </button>
      
      </div>
        ) : (
          <>
                    <div className="cart-body">
                      {cart.map(
                        (item, index) => (
                          <div
            key={`${item.id}-${item.size}-${item.color}`}
            ref={(el) => {
                if (el) {
                    itemRefs.current[
                        `${item.id}-${item.size}-${item.color}`
                    ] = el;
                }
            }}
            className={`cart-item ${
                removingKey ===
                `${item.id}-${item.size}-${item.color}`
                    ? "removing-item"
                    : ""
            }`}
            onClick={() => {

                setCartOpen(false);

                navigate(`/product/${item.id}`);

            }}
          >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

<div className="cart-item-info">

<h4>{item.name}</h4>

<p className="cart-price">
  ₹{item.price}
</p>

<p className="cart-variant">
  {item.size} • {item.color}
</p>

<div className="cart-qty">

<button
   className={`qty-btn ${
    animatingButton ===
    `${item.id}-${item.size}-${item.color}-minus`
        ? "qty-btn-pop"
        : ""
  }`}
  onClick={(e) => {
    e.stopPropagation();
    decreaseQty(index);
}}
>
<FiMinus />
</button>

<span
    className={`qty-value ${
        animatingQty ===
        `${item.id}-${item.size}-${item.color}`
            ? "qty-pop"
            : ""
    }`}
>
    {item.quantity}
</span>

<button
    className={`qty-btn ${
      animatingButton ===
      `${item.id}-${item.size}-${item.color}-plus`
          ? "qty-btn-pop"
          : ""
    }`}
    onClick={(e) => {
      e.stopPropagation();
      increaseQty(index);
  }}
>
<FiPlus />
</button>

</div>

</div>

<button
    className="remove-item-btn"
    onClick={(e) => {

      e.stopPropagation();

        console.log("Trash clicked");

        setSelectedItem({
            item,
            index,
        });

        setShowRemoveDialog(true);

    }}
>
<FiTrash2 className="trash-icon" />
</button>
                </div>
              )
            )}
             <div className="cart-summary">

<h3 className="summary-title">
    Order Summary
</h3>

<div className="summary-row">

    <span>Subtotal</span>

    <span>₹{subtotal}</span>
</div>

<div className="summary-row">

    <span>Shipping</span>

    <span
    className={
        subtotal >= freeShippingLimit
            ? "shipping-free"
            : ""
    }
>
    {subtotal >= freeShippingLimit
        ? "FREE"
        : `₹${shippingCharge}`}
</span>

</div>

<hr className="summary-divider" />

<div className="cart-total">

    <span>Total</span>

    <span>₹{grandTotal}</span>

</div>

</div>

            </div>



            <div className="cart-footer">

            <div className="delivery-card">

<div className="delivery-top">

    <div>
    {address ? (

<>

<div className="delivery-header">

    <div className="delivery-left">

        <span className="delivery-label">
            DELIVER TO
        </span>

        <span className="delivery-badge">

            {address.type === "Home" && "🏠 Home"}

            {address.type === "Work" && "💼 Work"}

            {address.type === "Other" && `📍 ${address.label}`}

        </span>

    </div>

    <button
        className="change-address-btn"
        onClick={() => setAddressSheetOpen(true)}
    >
        CHANGE
    </button>

</div>

    



<p className="delivery-name">
    {address.name}
</p>

<p className="delivery-address">

    {address.house}, {address.street}, {address.area}, {address.city} - {address.pincode}

</p>

</>

) : (

  <>
  <span className="delivery-label">
      DELIVERY
  </span>
  
  <p className="delivery-address">
      Enter address to check delivery estimate.
  </p>
  </>

  )}

    </div>

    {!address && (
    <button
        className="change-address-btn"
        onClick={() => setAddressSheetOpen(true)}
    >
        ADD
    </button>
)}

</div>

{address && (

<div className="delivery-estimate">

🚚 <span>{result.delivery}</span>

</div>



)}
</div>
         
<button
    className="checkout-btn"
    disabled={checkoutLoading}
    onClick={() => {

        // No address selected
        if (!address) {
            setAddressSheetOpen(true);
            showToast("📍 Please add a delivery address");
            return;
        }

        setCheckoutLoading(true);

        setTimeout(() => {

            setCartOpen(false);

            navigate("/checkout");

            setCheckoutLoading(false);

        }, 450);

    }}
>

        {checkoutLoading ? (
            <>
                <div className="checkout-spinner"></div>
                <span>Processing...</span>
            </>
        ) : (
            <>Checkout ₹{grandTotal}</>
        )}

      </button>
            </div>
          </>
        )}
      </div>


{showRemoveDialog && (

<>
<div
    className="dialog-overlay"
    onClick={() =>
        setShowRemoveDialog(false)
    }
/>

<div className="remove-dialog">

    <h3>
        Remove Item
    </h3>

    <p>

        Are you sure you want to remove

        <strong>
            {" "}
            {selectedItem?.item.name}
            {" "}
        </strong>

        from your bag?

    </p>

    <button
    className="wishlist-dialog-btn"
    onClick={() => {

        moveToWishlist(
            selectedItem.item,
            selectedItem.index
        );
        setSelectedItem(null);
        setShowRemoveDialog(false);

    }}
>
    ♡ Move to Wishlist
</button>

    <div className="dialog-actions">

        <button
            className="cancel-dialog-btn"
            onClick={() =>
                setShowRemoveDialog(false)
            }
        >
            Cancel
        </button>

        <button
    className="remove-dialog-btn"
    onClick={() => {

        console.log("Clicked");

        console.log(selectedItem);

        if (!selectedItem) return;

        setShowRemoveDialog(false);

        setRemovingKey(
          `${selectedItem.item.id}-${selectedItem.item.size}-${selectedItem.item.color}`
      );

      setTimeout(() => {

        removeItem(selectedItem.index);
    
        showToast("🗑️ Item Removed");
    
        setRemovingKey(null);
    
    }, 320);
        
        setSelectedItem(null);

    }}
>
    Remove
</button>

    </div>

</div>

</>

)}

{toast && (

<div className="toast">

    {toast}

</div>

)}

<AddressSheet

open={addressSheetOpen}

onClose={() => setAddressSheetOpen(false)}

onAddressSelected={() => {

  const savedAddresses =
      JSON.parse(localStorage.getItem("addresses")) || [];

  savedAddresses.sort((a, b) => {

      if (a.selected && !b.selected) return -1;
      if (!a.selected && b.selected) return 1;

      return 0;
  });

  setAddresses(savedAddresses);

  showToast("📍 Address Updated");

}}

/>



</>
  
  );
}

export default CartDrawer;