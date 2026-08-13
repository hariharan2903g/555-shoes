import "./WishlistPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import SizeSelectionSheet from "../components/SizeSelectionSheet/SizeSelectionSheet";
import { removeFromWishlist } from "../utils/wishlist";
import { addToCart } from "../utils/cart";
import { showToast } from "../utils/toast";

function WishlistPage({ setCartOpen }) {
  const navigate = useNavigate();
  const [showSizeSheet, setShowSizeSheet] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
const [selectedStock, setSelectedStock] = useState(null);
const [selectedWishlistProduct, setSelectedWishlistProduct] = useState(null);
const [selectedProduct, setSelectedProduct] = useState(null);
const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    setWishlist(savedWishlist);

  }, []);


  function handleRemove() {

    removeFromWishlist(selectedProduct.id);

    setWishlist(prev =>
        prev.filter(item => item.id !== selectedProduct.id)
    );

    setShowRemoveModal(false);

    showToast("💔 Removed from Wishlist");

    setSelectedProduct(null);

}

// console.log(selectedWishlistProduct);

const selectedColor =
    selectedWishlistProduct?.colors?.[0];

    const isSelectedAccessory =
    selectedWishlistProduct?.department?.toLowerCase() === "accessories";

const inventory =
    isSelectedAccessory
        ? {}
        : selectedColor?.inventory?.men || {};

const availableSizes = Object.entries(inventory)
    .filter(([_, value]) => value.visible)
    .map(([size, value]) => ({
        size,
        stock: Number(value.stock)
    }));


useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}, []);




  return (
    <div className="wishlist-page">

      <Header
        setCartOpen={setCartOpen}
      />
      <main className="wishlist-content">

      <section className="wishlist-section">

      <h1 className="wishlist-title">
          My Wishlist
      </h1>

        {wishlist.length === 0 && (

<div className="wishlist-empty">

    <h2>Your Wishlist is Empty</h2>

    <p>
        Save your favourite products and they'll appear here.
    </p>

    <button
        className="wishlist-explore-btn"
        onClick={() => navigate("/products")}
    >
        Explore Products
    </button>

</div>

)}

<div className="wishlist-products-grid">

<div className="wishlist-grid">

{wishlist.map((product) => {

const isAccessory =
    product?.department?.toLowerCase() === "accessories";

return (
        <ProductCard
            key={product.id}
            product={product}
            wishlist={true}
            onRemove={() => {

                setSelectedProduct(product);
                setShowRemoveModal(true);

            }}
            onAddToBag={() => {

              const isAccessory =
                  product?.department?.toLowerCase() === "accessories";
          
              if (isAccessory) {
          
                  addToCart({
                      product,
                      selectedColor:
                          product.colors?.[0]?.color,
                      selectedSize: null,
                      quantity: 1,
                  });
          
                  removeFromWishlist(product.id);
          
                  setWishlist(prev =>
                      prev.filter(item => item.id !== product.id)
                  );
          
                  showToast("🛍️ Moved to Bag");
          
                  return;
              }
          
              setSelectedWishlistProduct(product);
              setShowSizeSheet(true);
          
          }}
            />
          );
      })}
      

</div>



<SizeSelectionSheet

open={
  showSizeSheet &&
  !isSelectedAccessory
}

    onClose={() => {

        setShowSizeSheet(false);

        setSelectedSize(null);

    }}

    availableSizes={availableSizes}

    selectedSize={selectedSize}

    onSelectSize={(size) => {

        setSelectedSize(size);

        const stock = availableSizes.find(

            item => item.size === size

        )?.stock;

        setSelectedStock(stock);

    }}

    onAddToBag={() => {

      addToCart({
  
          product: selectedWishlistProduct,
  
          selectedColor:
              selectedWishlistProduct.colors[0].color,
  
          selectedSize,
  
          quantity: 1,
  
      });
  
      removeFromWishlist(
          selectedWishlistProduct.id
      );
  
      setWishlist(prev =>
          prev.filter(
              item =>
                  item.id !== selectedWishlistProduct.id
          )
      );
  
      setShowSizeSheet(false);
  
      setSelectedWishlistProduct(null);
  
      setSelectedSize(null);
  
      showToast("🛍️ Moved to Bag");
  
  }}

/>

<ConfirmModal
    isOpen={showRemoveModal}
    title="Remove from Wishlist?"
    message="Are you sure you want to remove this item from your wishlist?"
    confirmText="Remove"
    onCancel={() => setShowRemoveModal(false)}
    onConfirm={handleRemove}
/>
</div>

      </section>
      </main>
      <Footer />

    </div>
  );
}

export default WishlistPage;