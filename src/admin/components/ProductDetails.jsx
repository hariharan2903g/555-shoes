import { specificationConfig } from "../data/specificationConfig";

function ProductDetails({ product, setProduct }) {

  const handleSpecificationChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const toggleMultiSelect = (key, option) => {
    setProduct((prev) => {
      const current = prev.specifications[key] || [];
  
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
  
      return {
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: updated,
        },
      };
    });
  };

    return (

        <div className="admin-card">

  <h2>Specifications</h2>

  <div className="admin-grid">

 
  {!product.category ? (

<div className="spec-placeholder">

    <h3>Select a category</h3>

    <p>
        Choose a category to load the correct specifications.
    </p>

    <div className="spec-example">

        <strong>👟 Shoes</strong>

        <ul>
            <li>Shoe Style</li>
            <li>Best For</li>
            <li>Closure</li>
            <li>Toe Shape</li>
        </ul>

    </div>

    <div className="spec-example">

        <strong>⌚ Watches</strong>

        <ul>
            <li>Display Type</li>
            <li>Movement</li>
            <li>Dial Color</li>
            <li>Strap Material</li>
        </ul>

    </div>

</div>

) : (

specificationConfig[product.category]?.map((field) => (


 <div className="form-group" key={field.key}>
  <label>{field.label}</label>

  {field.type === "text" && (
    <input
      type="text"
      placeholder={`Enter ${field.label}`}
      value={product.specifications[field.key] || ""}
      onChange={(e) =>
        handleSpecificationChange(field.key, e.target.value)
      }
    />
  )}

  {field.type === "multiselect" && (
    <div className="multi-select-container">
      {field.options.map((option) => {
        const selected =
          (product.specifications[field.key] || []).includes(option);

        return (
          <button
            type="button"
            key={option}
            className={selected ? "multi-chip active" : "multi-chip"}
            onClick={() =>
              toggleMultiSelect(field.key, option)
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  )}

  {field.type === "boolean" && (
    <select
      value={product.specifications[field.key] || ""}
      onChange={(e) =>
        handleSpecificationChange(field.key, e.target.value)
      }
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  )}

  {field.type === "select" && (
    <select
      value={product.specifications[field.key] || ""}
      onChange={(e) =>
        handleSpecificationChange(field.key, e.target.value)
      }
    >
      <option value="">Select {field.label}</option>

      {field.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )}
</div>
))
)}


</div>

</div>

    );

}

export default ProductDetails;