function FeaturedProducts({
    products,
    setSelectedProduct,
  }) {
    return (
      <section className="section">
        <h2>Featured Collections</h2>
  
        <div className="product-grid">
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
      </section>
    );
  }
  
  export default FeaturedProducts;