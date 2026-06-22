import {
    FaHome,
    FaThLarge,
    FaShoppingBag,
    FaHeart,FaBox
  } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";

 
  
  function BottomNav({
    setMenuOpen,
    setCartOpen,
  }) {
    const navigate = useNavigate();

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
            <FaHome />
            <span>Home</span>
            </button>
  
        <button
          onClick={() => navigate("/catagories")}
        >
          <FaThLarge />
          <span>Categories</span>
        </button>
  
        <button
          onClick={() => setCartOpen(true)}
        >
          <FaShoppingBag />
          <span>Cart</span>
        </button>
  
        <button
        onClick={() => navigate("/wishlist")}
        >
        <FaHeart />
        <span>Wishlist</span>
        </button>
  
        <button
            onClick={() =>
                alert("Orders page coming soon")
            }
            >
            <FaBox />
            <span>Orders</span>
            </button>
  
      </div>
    );
  }
  
  export default BottomNav;