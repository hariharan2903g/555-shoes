import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductModal({
    product,setSelectedProduct,}) 
    {
      const navigate = useNavigate();
    useEffect(() => {document.body.style.overflow = "hidden";
      return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  // console.log(product);
    return (
      <div
        className="modal-overlay"
        onClick={() => setSelectedProduct(null)}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-btn"
            onClick={() => setSelectedProduct(null)}
          >
            ✕
          </button>
  
          <img
            src={product.image_url}
            alt={product.name}
            className="modal-image"
          />
  
          <div className="modal-product-name">
            <h2>{product.name}</h2>
  
            <p className="modal-price">
                <strong>MRP:</strong> ₹{product.price}
            </p>
            <div className="modal-divider"></div>

              <div className="modal-label">
                Brand
              </div>

              <div className="modal-value">{product.brand}
              </div>

                <div className="modal-label">
                  Category
              </div>

              <div className="modal-value">
                    {product.category}
              </div>

<div className="modal-divider"></div>
            <h3>Description</h3>
            <p className="modal-description">
               {product.description}
            </p>
  
            <button
            className="add-cart-btn"
            onClick={() => {

              setSelectedProduct(null);

              navigate(
                "/products?sort=newest"
              );

            }}
          >
            View All New Arrivals
          </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductModal;