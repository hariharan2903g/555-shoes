import "./ProductCard.css";
import noImage from "../../assets/no-image.png";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addToWishlist, removeFromWishlist, isWishlisted } from "../../utils/wishlist";

function ProductCard({ 
    product,
    displayColor = null,
    compact = false,
    wishlist = false,
    onRemove,
    onAddToBag
}) {

    const navigate = useNavigate();

    const [wishlisted, setWishlisted] = useState(false);

        useEffect(() => {

            function updateWishlist() {
        
                setWishlisted(
                    isWishlisted(product.id)
                );
        
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
        
        }, [product.id]);

        function toggleWishlist(e) {

            e.stopPropagation();
        
            if (isWishlisted(product.id)) {
        
                removeFromWishlist(product.id);
        
                setWishlisted(false);
        
            }
        
            else {
        
                addToWishlist(product);
        
                setWishlisted(true);
        
            }
        
        }

        // const image =
        // product.colors?.[0]?.images?.find(
        //     img =>
        //         img.id ===
        //         product.colors?.[0]?.coverImageId
        // )?.url ||
        // product.colors?.[0]?.images?.[0]?.url;

        const selectedColor = displayColor || product.colors?.[0];

        const coverImage = selectedColor?.images?.find(
            img => img.id === selectedColor.coverImageId
        );
        
        const image =
            coverImage?.url ||
            selectedColor?.images?.find(img => img.url)?.url ||
            noImage;

        return (

            <div
                    className={`shop-product-card ${
                        compact ? "shop-compact-card" : ""
                    }`}
                    onClick={() =>
                        navigate(
                            displayColor
                                ? `/product/${product.id}?color=${encodeURIComponent(displayColor.color)}`
                                : `/product/${product.id}`
                        )
                    }
            >
            {!compact && !wishlist && (
    <button
        className="shop-wishlist-btn"
        onClick={toggleWishlist}
    >
        {wishlisted ? (
            <FaHeart style={{ color: "#e53935" }} />
        ) : (
            <FiHeart />
        )}
    </button>
)}
            
            <div className="shop-card-image-wrapper">
            
            <img
                src={image}
                alt={product.product_name}
                className="shop-card-image"
                onError={(e) => {
                    console.log("Original image failed:", image);
                    console.log("Fallback:", noImage);

                    e.currentTarget.onerror = null;
                    e.currentTarget.src = noImage;
                }}
                />
            
            </div>
            
            <div className="shop-product-info">
            
            <p className="shop-product-brand">
            
                {product.brand}
            
            </p>
            
            <h3 className="shop-product-name">
            
            {product.product_name}
            
            </h3>
            {displayColor && (
                <p className="shop-product-color">
                    {displayColor.color}
                </p>
            )}

            
            {!compact && (

            <div className="shop-product-price-row">
            
            <span className="shop-selling-price">
            
            ₹{product.selling_price?.toLocaleString("en-IN")}
            
            </span>
            
            {Number(product.original_price) > 0 && (
    <>
        <span className="shop-original-price">
            ₹{Number(product.original_price).toLocaleString("en-IN")}
        </span>

        <span className="shop-discount">
            {Math.round(
                100 -
                (Number(product.selling_price) /
                Number(product.original_price) * 100)
            )}% OFF
        </span>
    </>
)}
            
            </div>
             )}
            
            </div>
            {wishlist && (

            <div className="wishlist-actions">

                <button
                    className="wishlist-remove"
                    onClick={(e) => {

                        e.stopPropagation();

                        onRemove();

                    }}
                >
                    🗑
                </button>

                <button
                    className="wishlist-add"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToBag();
                    }}
                >
                    Add To Bag
                </button>

            </div>

            )}
            
            </div>
            
            );

}

export default ProductCard;

















