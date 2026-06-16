import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import { saveScrollAndNavigate } from "../utils/navigation";
function FeaturedProducts({products, })
 {
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    return (
      <section className="section">
        <h2>Featured Collections</h2>
  
        <div
  className="product-grid"ref={sliderRef} >
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() =>saveScrollAndNavigate(navigate,`/product/${product.id}`)} >
              <img
                src={product.image_url}
                alt={product.name}
              />
  
              <div className="product-info">
                <h3>{product.name}</h3>
  
                <p>{product.price}</p>
  
                <span>
                  {product.category}
                </span>
  
                <button onClick={(e) => {e.stopPropagation();
                saveScrollAndNavigate(navigate,`/product/${product.id}`);
                     }}
                    >
              View Product
                  </button>
              </div>
            </div>
          ))}
        </div>
        <div className="scroll-controls">
  <button
    onClick={() =>
      sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  >
    <FaChevronLeft />
  </button>

  <button
    onClick={() =>
      sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  >
<FaChevronRight/>  </button>
</div>
      </section>
    );
  }
  
  export default FeaturedProducts;