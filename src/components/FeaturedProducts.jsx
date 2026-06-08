import { useRef } from "react";
import {FaChevronLeft,FaChevronRight,} from "react-icons/fa";
function FeaturedProducts({
    products,
    setSelectedProduct,
  }) {
    const sliderRef = useRef(null);
    return (
      <section className="section">
        <h2>Featured Collections</h2>
  
        <div
  className="product-grid"ref={sliderRef} >
          {products.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
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
  
                <button
                onClick={() => setSelectedProduct(product)}>
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
<FaChevronRight/> 
 </button>
</div>
      </section>
    );
  }
  
  export default FeaturedProducts;