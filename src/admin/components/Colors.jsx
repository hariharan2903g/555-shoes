import { useState } from "react";
import ColorCard from "./ColorCard";
import { createInventory } from "../services/inventoryService";
import { toast } from "react-toastify";

function Colors({ product, setProduct }) {

  const [expandedColorId, setExpandedColorId] = useState(null);

    const addColor = () => {

      if (!product.gender) {
        toast.error("Please select a gender first.");
        return;
      }

      setProduct((prev) => ({
        ...prev,
        colors: [
          ...prev.colors,
          {
            id: Date.now(),
          
            color: "",
          
            images: [],
          
            selectedImageId: null,
          
            coverImageId: null,
          
            inventory: createInventory(product.gender),
          
            useMainPricing: true,
          
            selling_price: "",
          
            original_price: "",
          
          },
        ],
      }));
    };
  
    return (
      <div className="admin-card">
        <h2>Colors</h2>
  
        <button
          className="admin-btn"
          onClick={addColor}
        >
          + Add Color
        </button>
  
        <div style={{ marginTop: "20px" }}>
                {product.colors.map((color) => (

        <ColorCard
        key={color.id}
        color={color}
        product={product}
        setProduct={setProduct}
        isExpanded={expandedColorId === color.id}
        toggleExpand={() =>
          setExpandedColorId(
            expandedColorId === color.id ? null : color.id
          )
        }
    />
        ))}
        </div>
      </div>
    );
  }
  
  export default Colors;






  