function Pricing({ product, setProduct }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const selling = Number(product.selling_price);
    const original = Number(product.original_price);

    const discount =
    product.selling_price &&
    product.original_price &&
    original > selling
        ? Math.round(((original - selling) / original) * 100)
        : "";
  
    return (
      <div className="admin-card">
        {/* <h2>Pricing</h2> */}

        <div className="admin-grid">
  
        <div className="form-group">
          <label>Selling Price (₹)</label>
  
          <input
            type="number"
            name="selling_price"
            value={product.selling_price}
            onChange={handleChange}
            placeholder="Enter selling price"
            min="0"
          />
        </div>

        
  
        <div className="form-group">
          <label>Original Price (₹)</label>
  
          <input
            type="number"
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            placeholder="Enter original price"
            min="0"
          />
          {product.original_price &&
            product.selling_price &&
            Number(product.selling_price) > Number(product.original_price) && (
            <p className="error-text">
                Selling Price cannot be greater than Original Price.
            </p>
            )}
        </div>
  
        <div className="form-group">
          <label>Discount</label>
  
          <input
            type="text"
            value={discount ? `${discount}% OFF` : ""}
            readOnly
            />
        </div>

        </div>

      </div>
    );
  }
  
  export default Pricing;