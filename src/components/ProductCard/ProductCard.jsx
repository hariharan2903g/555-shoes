import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { addToWishlist, removeFromWishlist, isWishlisted } from "../../utils/wishlist";

function ProductCard({ 
    product ,

    compact = false
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

        const image =
        product.colors?.[0]?.images?.find(
            img =>
                img.id ===
                product.colors?.[0]?.coverImageId
        )?.url ||
        product.colors?.[0]?.images?.[0]?.url;

        return (

            <div
                    className={`shop-product-card ${
                        compact ? "shop-compact-card" : ""
                    }`}
                onClick={() =>
                    navigate(`/product/${product.id}`)
                }
            >
            {!compact && (
            <button
               className="shop-wishlist-btn"
                onClick={toggleWishlist}
            >
            
            {wishlisted ?

                <FaHeart
                    style={{ color:"#e53935" }}
                />

                :

                <FiHeart />

                }
            
            </button>
            )}
            
            <div className="shop-card-image-wrapper">
            
            <img
                src={image}
                alt={product.product_name}
                 className="shop-card-image"
            />
            
            </div>
            
            <div className="shop-product-info">
            
            <p className="shop-product-brand">
            
                {product.brand}
            
            </p>
            
            <h3 className="shop-product-name">
            
            {product.product_name}
            
            </h3>
            {!compact && (

            <div className="shop-product-price-row">
            
            <span className="shop-selling-price">
            
            ₹{product.selling_price?.toLocaleString("en-IN")}
            
            </span>
            
            {product.original_price && (
            
            <>
            <span className="shop-original-price">
            
            ₹{product.original_price?.toLocaleString("en-IN")}
            
            </span>
            
            <span className="shop-discount">
            
            {Math.round(
            
            100 -
            
            (product.selling_price /
            product.original_price * 100)
            
            )}% OFF
            
            </span>
            </>
            
            )}
            
            </div>
             )}
            
            </div>
       
            
            </div>
            
            );

}

export default ProductCard;