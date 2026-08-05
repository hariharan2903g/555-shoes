import { categoryConfig } from "../data/categoryConfig";
import { brandConfig } from "../data/brandConfig";
import { materialConfig } from "../data/materialConfig";

function BasicInfo({ product, setProduct }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProduct((prev) => {
      if (name === "department") {
        return {
          ...prev,
          department: value,
          category: "",
          brand: "",
          specifications: {},
        };
      }

      if (name === "category") {
        return {
          ...prev,
          category: value,
          brand: "",
          material: "",
          specifications: {},
        };
      }
  
      return {
        ...prev,
        [name]: value,
      };
    });
  };

    return (
      <div className="admin-card">

<h2>General Information</h2>

<div className="admin-grid">

<div className="form-group">
          <label>Product Name</label>
                    <input
                type="text"
                name="product_name"
                placeholder="Enter product name"
                value={product.product_name}
                onChange={handleChange}
                />
        </div>

        <div className="form-group">
        <label>Department</label>

        <select
          name="department"
          value={product.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
  
        <div className="form-group">
          <label>Category</label>
          <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {product.department &&
            categoryConfig[product.department].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>                  
        </div>
  
        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            disabled={!product.category}
          >
            <option value="">
              {product.category ? "Select Brand" : "Select Category First"}
            </option>

            {product.category &&
              brandConfig[product.category]?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>
        
  
        <div className="form-group">
  <label>Gender</label>

            <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
            </select>
</div>

<div className="form-group">
  <label>Material</label>

  <select
    name="material"
    value={product.material}
    onChange={handleChange}
    disabled={!product.category}
  >
    <option value="">
      {product.category ? "Select Material" : "Select Category First"}
    </option>

    {product.category &&
      materialConfig[product.category]?.map((material) => (
        <option key={material} value={material}>
          {material}
        </option>
      ))}
  </select>
</div>


<div className="form-group">

<label>Occasion</label>

<input
  type="text"
  name="occasion"
  value={product.occasion}
  onChange={handleChange}
/>

</div>

</div>

      </div>
      



    );
  }
  
  export default BasicInfo;