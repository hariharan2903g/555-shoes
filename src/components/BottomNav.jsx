import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiHeart,
  FiPackage
} from "react-icons/fi";
  import { useNavigate } from "react-router-dom";

 
  
  function BottomNav({
    setMenuOpen,
    setCartOpen,
  }) {
    const navigate = useNavigate();

    const cart =
  JSON.parse(localStorage.getItem("cart")) || [];

const wishlist =
  JSON.parse(localStorage.getItem("wishlist")) || [];

const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

    function goHome() {
  
      sessionStorage.removeItem(
        "homeScroll"
      );
    
      navigate("/");
    
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    return (

        
        
      <div className="bottom-nav">
  
            <button onClick= {goHome}>
            <FiHome />
            <span>Home</span>
            </button>
  
        <button
          onClick={() => navigate("/Categories")}
        >
          <FiGrid />
          <span>Categories</span>
        </button>
  
            <button
        onClick={() => setCartOpen(true)}
       >
      <div className="nav-icon">
        <FiShoppingBag />

        {cartCount > 0 && (
          <span className="nav-badge">
            {cartCount}
          </span>
        )}
      </div>

      <span>Cart</span>
    </button>
  
        <button
        onClick={() => navigate("/wishlist")}
        >
     <div className="nav-icon">

        <FiHeart />

        {wishlist.length > 0 && (

            <span className="nav-badge">

                {wishlist.length}

            </span>

        )}

        </div>
        <span>Wishlist</span>
        </button>
  
        <button
            onClick={() =>
                alert("Orders page coming soon")
            }
            >
            <FiPackage/>
            <span>Orders</span>
            </button>
  
      </div>
    );
  }
  
  export default BottomNav;