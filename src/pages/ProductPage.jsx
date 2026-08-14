import "./ProductPage.css";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef  } from "react";
import { supabase } from "../supabase";
import Footer from "../components/Footer";
import Header from "../components/Header";
import logo from "../assets/skookslogo.png";
import { Link } from "react-router-dom";
import { FiShare2, FiHeart, FiChevronRight, FiLoader} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { getDeliveryEstimate } from "../utils/deliveryService";
import BottomSheet from "../components/BottomSheet"; 
import SizeGuide from "../components/SizeGuide/SizeGuide";
import { TbRefresh } from "react-icons/tb";
import { MdLocalShipping } from "react-icons/md";
import { RiFlashlightFill } from "react-icons/ri";
import DeliveryInformation from "../components/DeliveryInformation/DeliveryInformation";
import ReturnReplacement from "../components/ReturnReplacement/ReturnReplacement";
import { addToWishlist, removeFromWishlist, isWishlisted } from "../utils/wishlist";
import ProductCard from "../components/ProductCard/ProductCard";
import noImage from "../assets/no-image.png";
import { addToCart } from "../utils/cart";
// import DeliveryBanner from "../components/DeliveryBanner";
// import AddressSheet from "../pages/AddressPage";

function ProductPage({
  setCartOpen,
  setHideBottomNav
}) {
  // const [showAddressSheet,setShowAddressSheet] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const colorFromUrl = searchParams.get("color");
  const [pincode, setPincode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [checkingDelivery, setCheckingDelivery] = useState(false);
  const [showDeliveryResult, setShowDeliveryResult] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageAnimating, setImageAnimating] = useState(false);
  const [recentProducts,setRecentProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [customersAlsoBought, setCustomersAlsoBought] = useState([]);
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [deliveryError, setDeliveryError] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [toast, setToast] = useState({
    show: false,
    message: ""
});

  useEffect(() => {

    const viewed =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];
  
    setRecentProducts(viewed);
  
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  useEffect(() => {
    setAddedToCart(false);
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
  
    const wishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];
  
    const exists = wishlist.some(
      (item) => item.id === product.id
    );
  
    setWishlisted(exists);
  
  }, [product]);

  useEffect(() => {

    function loadWishlist() {

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        setWishlistIds(
            wishlist.map(item => item.id)
        );

    }

    loadWishlist();

    window.addEventListener(
        "wishlistUpdated",
        loadWishlist
    );

    return () => {

        window.removeEventListener(
            "wishlistUpdated",
            loadWishlist
        );

    };

}, []);

  useEffect(() => {

    const addresses =
        JSON.parse(
            localStorage.getItem("addresses")
        ) || [];

    const selected =
        addresses.find(
            address => address.selected
        );

        if (selected) {

          setSelectedAddress(selected);
      
          setPincode(selected.pincode);
      
          checkDelivery(selected.pincode);
      
      }

}, []);

  // useEffect(() => {

  //   if (!product) return;
  
  //   const cart =
  //     JSON.parse(
  //       localStorage.getItem("cart")
  //     ) || [];
  
  //     useEffect(() => {

  //       if (!product || !selectedSize) {
    
  //           setAddedToCart(false);
    
  //           return;
    
  //       }
    
  //       checkIfAddedToCart(
  //           selectedSize,
  //           selectedColor
  //       );
    
  //   }, [
  //       product,
  //       selectedSize,
  //       selectedColor
  //   ]);
  
  // }, [product]);

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {

    function handleScroll() {

      const current = window.scrollY;
  
      if (current > lastScrollY.current && current > 60) {
  
          setNavHidden(true);
          setHideBottomNav(true);
  
      }
  
      else if (current < lastScrollY.current) {
  
          setNavHidden(false);
          setHideBottomNav(false);
  
      }
  
      lastScrollY.current = current;
  
  }

    window.addEventListener("scroll", handleScroll);

    return () =>
        window.removeEventListener("scroll", handleScroll);

}, []);

function showToast(message) {

  setToast({
      show: true,
      message
  });

  setTimeout(() => {

      setToast({
          show: false,
          message: ""
      });

  }, 1800);

}
  

  async function fetchProduct() {
    setLoading(true);
    
  
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
  
      if (error) {
        console.error(error);
      } else {
        setProduct(data);

const matchingColor = data.colors?.find(
  color => color.color === colorFromUrl
);

setSelectedColor(
  matchingColor?.color ||
  data.colors?.[0]?.color ||
  ""
);
        
        const inventory =
            data.gender?.toLowerCase() === "women"
              ? data.colors?.[0]?.inventory?.women
              : data.colors?.[0]?.inventory?.men;

              setSelectedSize("");
              setSelectedStock(null);

       


        fetchRecommendations(data);

        const viewed =
          JSON.parse(
            localStorage.getItem(
              "recentlyViewed"
            )
          ) || [];
      
        const filtered = viewed.filter(
          (item) => item.id !== data.id
        );
      
        filtered.unshift(data);
      
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify(
            filtered.slice(0, 10)
          )
        );
        setRecentProducts(
          filtered.slice(0, 10)
        );
      }

      setLoading(false);
      }
  

      async function fetchRecommendations(currentProduct) {

        const { data, error } = await supabase
          .from("products")
          .select("*");
      
        if (error) return;
      
        // Shop Similar
        const similarProducts = data
          .filter(item =>
            item.id !== currentProduct.id &&
            item.category === currentProduct.category
          )
          .slice(0, 12);
      
        setRecommendedProducts(similarProducts);
      
//         console.log("Current category:", currentProduct.category);
// console.log("All products:", data);

        // Customers Also Bought
        const otherProducts = data
          .filter(item =>
            item.id !== currentProduct.id &&
            item.category !== currentProduct.category
          )
          
          .slice(0, 12);
          // console.log("Customers also bought:", otherProducts);
      
        setCustomersAlsoBought(otherProducts);
      
      }

      const lastScrollY = useRef(0);
      const sizeGuideRef = useRef(null);
      const sizeSectionRef = useRef(null);
      const touchStartX = useRef(0);
      const touchEndX = useRef(0);
      const [sizeError, setSizeError] = useState(false);
      const [shaking, setShaking] = useState(false);

 

  const colors =
    product?.colors || [];

    const isAccessory =
  product?.department?.toLowerCase() === "accessories";

    const hasDiscount =
    Boolean(
      product?.original_price &&
      product.original_price > product.selling_price
    );
  
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.original_price - product.selling_price) /
          product.original_price) *
          100
      )
    : null;

  const selectedColorData =
    product?.colors?.find(
        color => color.color === selectedColor
    ) || product?.colors?.[0];

    

const selectedInventory =
  product?.gender?.toLowerCase() === "women"
    ? selectedColorData?.inventory?.women
    : selectedColorData?.inventory?.men;

const availableSizes = Object.entries(
  selectedInventory || {}
)
  .filter(([_, value]) => value.visible)
  .map(([size, value]) => ({
    size,
    stock: value.stock,
  }));

const allImages =
    selectedColorData?.images || [];

    // console.log("selectedColorData =", selectedColorData);
    // console.log("inventory =", selectedColorData?.inventory);
    // console.log( "isArray =",  Array.isArray(selectedColorData?.inventory) );

    const productDetails = [

      {
        label: "Brand",
        value: product?.brand
      },
    
      {
        label: "Category",
        value: product?.category
      },
    
      {
        label: "Gender",
        value: product?.gender
      },
    
      ...(product?.specifications
          ? Object.entries(product.specifications).map(([key, value]) => ({
            label: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase()),
              value
          }))
          : [])
    
    ].filter(detail => detail.value);

  

  async function checkDelivery(pin) {
    setDeliveryError(false);
    setShowDeliveryResult(false);

    if (!pin || pin.length !== 6) {

        setDeliveryLocation("");

        setDeliveryEstimate(
            "Enter a valid pincode."
        );

        return;

    }

    setCheckingDelivery(true);

    const result =
        await getDeliveryEstimate(pin);

    setCheckingDelivery(false);

    if (!result.success) {

      setDeliveryError(true);
  
      setDeliveryLocation("");
  
      setDeliveryEstimate(result.message);
      setTimeout(() => {

        setShowDeliveryResult(true);
    
    }, 100);
  
      return;
  
  }

  setDeliveryError(false);

  setDeliveryLocation(
    `${result.area}, ${result.district}`
);

setDeliveryEstimate(result.estimate);

setTimeout(() => {

    setShowDeliveryResult(true);

}, 100);
}

function handleTouchStart(e) {
  touchStartX.current = e.changedTouches[0].clientX;
}

function handleTouchEnd(e) {

  touchEndX.current = e.changedTouches[0].clientX;

  const distance = touchStartX.current - touchEndX.current;

  if (Math.abs(distance) < 50) return;

  setImageAnimating(true);

  setTimeout(() => {

      if (distance > 0) {

          setCurrentImage(prev =>
              prev === allImages.length - 1 ? 0 : prev + 1
          );

      } else {

          setCurrentImage(prev =>
              prev === 0 ? allImages.length - 1 : prev - 1
          );

      }

      setImageAnimating(false);

  }, 150);

}

function addToCart() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];


    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    
    if (existingItem) {
    
      existingItem.quantity += quantity;
    
    } else {
    
      cart.push({
        id: product.id,
        name: product.product_name,
        price: product.selling_price,
        image:
        selectedColorData?.images?.find(
            image =>
                image.id ===
                selectedColorData.coverImageId
        )?.url,
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    
    }
  

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
  
  window.dispatchEvent(
    new Event("cartUpdated")
  );
  setAddedToCart(true);
  showToast("🛍️ Added to cart");
}

function checkIfAddedToCart(size, color) {

  const cart =
      JSON.parse(
          localStorage.getItem("cart")
      ) || [];

  const exists = cart.some(item =>

      item.id === product.id &&
      item.size === size &&
      item.color === color

  );

  setAddedToCart(exists);

}

// Wishlist function

function toggleWishlist() {

  if (isWishlisted(product.id)) {

      removeFromWishlist(product.id);

      setWishlisted(false);

      showToast("💔 Removed from Wishlist");

  }

  else {

      addToWishlist(product);

      setWishlisted(true);

      showToast("❤️ Added to Wishlist");

  }

}

  if (loading) {
    return (
      <div className="loading-screen">
  
        <img
          src={logo}
          alt="SkookS"
          className="loading-logo"
        />
      </div>
    );
  }

  return (
    <div className="product-page-container">
      <Header  
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      setCartOpen={setCartOpen}
      />

{/* <DeliveryBanner

selectedAddress={selectedAddress}

onOpen={() => setShowAddressSheet(true)}

/> */}

      <section className="product-page">
  
        <div className="product-page-card">
  
        <div
            className="product-image-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

             {/* Left Arrow */}
            {allImages.length > 1 && (
                <button
                    className="image-arrow left-arrow"
                    onClick={() => {

                      setImageAnimating(true);
                  
                      setTimeout(() => {
                  
                          setCurrentImage(
                              currentImage === 0
                                  ? allImages.length - 1
                                  : currentImage - 1
                          );
                  
                          setImageAnimating(false);
                  
                      }, 150);
                  
                  }}
                >
                    ❮
                </button>
            )}

                <img
                    src={
                        allImages[currentImage]?.preview ||
                        allImages[currentImage]?.url ||
                        noImage
                    }
                    onError={(e) => {
                        e.target.src = noImage;
                    }}
                  alt={product.product_name}
                  className={`product-page-image ${
                      imageAnimating ? "fade-image" : ""
                  }`}
              />

            {/* Right Arrow */}
            {allImages.length > 1 && (
                <button
                    className="image-arrow right-arrow"
                    onClick={() => {

                      setImageAnimating(true);
                  
                      setTimeout(() => {
                  
                          setCurrentImage(
                              currentImage === allImages.length - 1
                                  ? 0
                                  : currentImage + 1
                          );
                  
                          setImageAnimating(false);
                  
                      }, 150);
                  
                  }}
                >
                    ❯
                </button>
            )}

            {/* Dots */}

            {allImages.length > 1 && (

            <div className="image-dots">

            {allImages.map((image,index)=>(

            <button
            key={image.id}
            className={`image-dot ${
            currentImage===index ? "active":""
            }`}
            onClick={() => {

              setImageAnimating(true);
          
              setTimeout(() => {
          
                  setCurrentImage(index);
          
                  setImageAnimating(false);
          
              }, 150);
          
          }}
            />

            ))}

            </div>

            )}

            </div>
                      
        

          <div className="product-page-details">
  
                <Link
          to={`/brand/${product.brand.toLowerCase()}`}
          className="product-brand clickable-brand"
      >
          {product.brand}
      </Link>

      <h1 className="product-title">
          {product.product_name}
      </h1>

      {/* <div className="product-rating">

          ★★★★★

          <span>No reviews yet</span>

      </div> */}

<div className="product-price-section">

{hasDiscount && (
  <span className="old-price">
    ₹{product.original_price.toLocaleString("en-IN")}
  </span>
)}

<div className="product-price-row">

  <span className="current-price">
    ₹{product?.selling_price?.toLocaleString("en-IN")}
  </span>

  {hasDiscount && (
    <span className="discount-badge">
      {discountPercent}% OFF
    </span>
  )}

</div>

</div>

            <h3>
              Color:
              <span className="selected-color-name">
                {" "}{selectedColor}
              </span>
            </h3>

            <div className="color-options">
            {colors.map((colorObj) => (
                <button
                key={colorObj.id}
                className={`color-circle ${
                    selectedColor === colorObj.color
                        ? "selected-color"
                        : ""
                }`}
                onClick={() => {
            
                    setSelectedColor(colorObj.color);
            
                    const inventory =
                        product?.gender?.toLowerCase() === "women"
                            ? colorObj.inventory?.women
                            : colorObj.inventory?.men;
            
                    setSelectedSize("");
                    setCurrentImage(0);
                    setAddedToCart(false);
            
                }}
            >
            
                <img
                    src={
                        colorObj.images?.find(
                            image =>
                                image.id === colorObj.coverImageId
                        )?.url
                    }
                    alt={colorObj.color}
                    className="color-thumbnail"
                />
            
            </button>
                
              ))}
            </div>
  
            <div className="product-page-divider"></div>
            {!isAccessory && (
            <div
                ref={sizeSectionRef}
                className={`size-section ${
                    sizeError ? "size-error" : ""
                } ${
                    shaking ? "shake-size" : ""
                }`}
            >

            <div className="size-header">
              
              <h3>
                  {selectedSize
                    ? `Size: ${selectedSize}`
                    : "Select Size"}
                </h3>
              

            <button
            className="size-guide-btn"
            onClick={() => setShowSizeGuide(true)}
        >
                📏 Size Guide
            </button>
            </div>

                <div className="size-options">
                {availableSizes.map((item) => {

                    const outOfStock = item.stock <= 0;

                    return (

                        <button
                            key={item.size}
                            disabled={outOfStock}
                            className={`size-btn
                                ${selectedSize === item.size ? "selected-size" : ""}
                                ${outOfStock ? "out-of-stock" : ""}
                            `}
                            onClick={() => {

                                if (outOfStock) return;

                                setSelectedSize(item.size);
                                setSelectedStock(item.stock);
                                setSizeError(false);

                                checkIfAddedToCart(
                                  item.size,
                                  selectedColor
                              );
                               

                            }}
                        >
                            {item.size}
                        </button>

                    );

                    })}
                  
                </div>
               
               
                {selectedStock !== null && selectedStock <= 5 && (
                  <p
                    className={`stock-message ${
                      selectedStock <= 3 ? "low-stock" : "medium-stock"
                    }`}
                  >
                    <span className="stock-dot"></span>
                    Only {selectedStock} left in stock
                  </p>
                )}


                </div>
              )}
           
  
            <div className="product-page-divider"></div>

<div className="delivery-section">

    {/* <div className="delivery-header">

        <h3>Delivery</h3>

    </div> */}

    <div className="delivery-card">

        {/* <p className="delivery-label">

            Deliver to

        </p> */}

        <div className="delivery-input-row">

        <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) =>
                setPincode(e.target.value)
            }
            placeholder="Enter Pincode"
            className="pincode-input"
        />

        <button
            className={`check-pincode-btn ${
                pincode.length === 6
                    ? "active"
                    : ""
            }`}
            disabled={
                pincode.length !== 6 ||
                checkingDelivery
            }
            onClick={() =>
                checkDelivery(pincode)
            }
        >
            {checkingDelivery ? (
            <>
                <FiLoader className="spinner" />
                Checking
            </>
        ) : (
            "CHECK"
        )}
        </button>

        </div>
        <div
    className={`delivery-info ${
        showDeliveryResult ? "show" : ""
    }`}
>

    {/* {deliveryLocation && (

        <p className="delivery-location">

            📍 {deliveryLocation}

        </p>

    )} */}

          <div className="delivery-result">

          {(deliveryLocation || deliveryEstimate) && (
              <div className="delivery-divider"></div>
          )}

          {deliveryLocation && (

              <p className="delivery-location">

                  📍 {deliveryLocation}

              </p>

          )}

          <p
              className={
                  deliveryError
                      ? "delivery-error"
                      : "delivery-success"
              }
          >

              {checkingDelivery
                  ? "Checking delivery..."
                  : deliveryEstimate ||
                    "🚚 Enter your pincode to check delivery."}

          </p>

       

          </div>



</div>

<div className="delivery-features">

<button
    className="delivery-feature"
    onClick={() => setShowReturnPolicy(true)}
>
      <TbRefresh />

    <strong>7-Day</strong>
    <span>Easy  Exchange</span>
</button>

<button
    className="delivery-feature"
    onClick={() => setShowDeliveryInfo(true)}
>
      <MdLocalShipping />
    <strong>Free Shipping</strong>
    <span>On orders above ₹2500</span>
</button>

<button
    className="delivery-feature"
    onClick={() => setShowDeliveryInfo(true)}
>
      <RiFlashlightFill />
    <strong>Express</strong>
    <span>Fast Delivery</span>
</button>

</div>

    </div>

</div>

<div className="product-accordions">
<div className="accordion-item">

<button
    className="accordion-header"
    onClick={() =>
        setOpenAccordion(
            openAccordion === "details"
                ? null
                : "details"
        )
    }
>

        <span>Product Details</span>

        <span className="accordion-plus">
            {openAccordion === "details" ? "−" : "+"}
        </span>

    </button>

</div>

<div
    className={`accordion-content ${
        openAccordion === "details"
            ? "open"
            : ""
    }`}
>

<div className="accordion-inner">

<div className="product-details-list">

{

productDetails.map((detail,index)=>(

<div
    key={detail.label}
    className="detail-row"
>

<div className="detail-column">

<p className="detail-title">

    {detail.label}

</p>

{Array.isArray(detail.value) ? (

<div className="detail-array">

    {detail.value.map((item) => (

        <span
            key={item}
            className="detail-chip"
        >
            {item}
        </span>

    ))}

</div>

) : (

<p className="detail-text">

    {detail.value}

</p>

)}

</div>

{

productDetails[index+1] && (

<div className="detail-column">

<p className="detail-title">

    {productDetails[index+1].label}

</p>

<p className="detail-text">

    {productDetails[index+1].value}

</p>

</div>

)

}

</div>

))

.filter((_,index)=>index%2===0)

}

</div>

</div>

</div>


<div className="accordion-item">

    <button
        className="accordion-header"
        onClick={() =>
            setOpenAccordion(
                openAccordion === "description"
                    ? null
                    : "description"
            )
        }
    >

        <span>Description</span>

        
        <span className="accordion-plus">
    {openAccordion === "details" ? "−" : "+"}
</span>

    </button>

    <div
    className={`accordion-content ${
        openAccordion === "description"
            ? "open"
            : ""
    }`}
>

    <div className="accordion-inner">

        <p>{product.description}</p>

    </div>

</div>

</div>

<div className="accordion-item">

    <button
        className="accordion-header"
        onClick={() => setShowDeliveryInfo(true)}
    >

        <span>Delivery Information</span>

        <span className="accordion-plus">+</span>

    </button>

</div>

<div className="accordion-item">

    <button
        className="accordion-header"
        onClick={() =>
            setOpenAccordion(
                openAccordion === "warranty"
                    ? null
                    : "warranty"
            )
        }
    >

        <span>Warranty</span>

        <span className="accordion-plus">
    {openAccordion === "details" ? "−" : "+"}
</span>
    </button>
    <div
    className={`accordion-content ${
        openAccordion === "warranty"
            ? "open"
            : ""
    }`}
>

    <div className="accordion-inner">

    <p><strong>No Manufacturer Warranty</strong></p>
    <br></br>

    <p>

      The products sold on <strong>SkookS</strong> are
      not covered under any manufacturer or seller warranty.
      However, every order is carefully inspected before
      dispatch, and if you receive a damaged, defective,
      or incorrect product, we'll be happy to assist you
      with a replacement as per our
      <strong> Replacement Policy.</strong>

      </p>

    </div>

</div>

</div>

<div className="accordion-item">

<button
    className="accordion-header"
    onClick={() => setShowReturnPolicy(true)}
>
      <span>Return & Replacement Policy</span>

        <span className="accordion-plus"> + </span>

    </button>

</div>
</div>


          </div>
  
        </div>
  
      </section>
      {recommendedProducts.length > 0 && (
      <section className="section">

    <h2 className="section-title">Shop Similar</h2>

    <div className="you-may-like-grid">

        {recommendedProducts.map(item => (

            <ProductCard
                key={item.id}
                product={item}
            />

        ))}

    </div>

</section>
)}

<section className="section">

  <h2 className="section-title">
    You May Also Like
  </h2>

  <div className="you-may-like-grid">

    {customersAlsoBought.map(item => (

      <ProductCard
        key={item.id}
        product={item}
      />

    ))}

  </div>

</section>

<section className="section">

    <h2 className="section-title">Recently Viewed</h2>

    <div className="recent-products-row">

        {recentProducts
            .filter(item => item.id !== product.id)
            .map(item => (

                <ProductCard
                    key={item.id}
                    product={item}
                    compact
                />

        ))}

    </div>

</section>


      <Footer />

      <div
        className={`sticky-product-footer ${
          navHidden ? "nav-hidden" : ""
      }`}
    >

    <button
        className="footer-icon-btn"
    >
        <FiShare2 />
    </button>

    <button
    className="footer-icon-btn"
    onClick={toggleWishlist}
>
    {wishlisted ? (
        <FaHeart className="filled-heart" />
    ) : (
        <FiHeart />
    )}
</button>

<button
    className="footer-add-btn"
    onClick={() => {

      if (addedToCart) {
  
       setCartOpen(true)
  
          return;
  
      }
  
      if (!isAccessory && !selectedSize) {
  
          const y =
              sizeSectionRef.current.getBoundingClientRect().top +
              window.pageYOffset -
              130;
  
          window.scrollTo({
              top: y,
              behavior: "smooth",
          });
  
          setTimeout(() => {
  
              setSizeError(true);
  
              setShaking(true);
  
          }, 400);
  
          setTimeout(() => {
  
              setShaking(false);
  
          }, 850);
  
          return;
  
      }
  
      addToCart();
  
  }}
>

    {addedToCart ? "View Cart" : "Add to Bag"}

</button>

</div>
<BottomSheet
    open={showSizeGuide}
    title="Size Guide"
    onClose={() => setShowSizeGuide(false)}
>

<SizeGuide />

</BottomSheet>

<BottomSheet
    open={showDeliveryInfo}
    title="Delivery Information"
    onClose={() => setShowDeliveryInfo(false)}
>

    <DeliveryInformation />

</BottomSheet>

<BottomSheet
    open={showReturnPolicy}
    title="Return & Replacement"
    onClose={() => setShowReturnPolicy(false)}
>

    <ReturnReplacement />

</BottomSheet>

{/* <AddressSheet
    open={showAddressSheet}
    onClose={() => setShowAddressSheet(false)}
    selectedAddress={selectedAddress}
    setSelectedAddress={setSelectedAddress}
/> */}





{toast.show && (

<div className="app-toast">

    {toast.message}

</div>

)}

</div>
  );
}

export default ProductPage;