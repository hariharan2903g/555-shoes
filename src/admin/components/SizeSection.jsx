import { MEN_SIZES, WOMEN_SIZES } from "../constants/sizes";
import { useState } from "react";

function SizeSection({ color, product, setProduct }) {

    const [showMenSizes, setShowMenSizes] = useState(false);
    const [showWomenSizes, setShowWomenSizes] = useState(false);

    const handleStockChange = (category, size, value) => {
    const stock = Math.max(0, Number(value) || 0);
      
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) => {
            if (item.id !== color.id) return item;
      
            return {
              ...item,
              inventory: {
                ...item.inventory,
      
                [category]: {
                  ...item.inventory[category],
      
                  [size]: {
                    ...item.inventory[category][size],
                    stock,
                  },
                },
              },
            };
          }),
        }));
      };

      const handleVisibilityChange = (category, size) => {
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) => {
            if (item.id !== color.id) return item;
      
            return {
              ...item,
              inventory: {
                ...item.inventory,
      
                [category]: {
                  ...item.inventory[category],
      
                  [size]: {
                    ...item.inventory[category][size],
                    visible: !item.inventory[category][size].visible,
                  },
                },
              },
            };
          }),
        }));
      };


    return (        
        <div className="sizes-section">

        <h4>Inventory</h4>

        <h5
            onClick={() => setShowMenSizes(!showMenSizes)}
            style={{ cursor: "pointer" }}
            >
            {showMenSizes ? "▼" : "▶"} Men's Sizes
            </h5>

            {showMenSizes &&
        MEN_SIZES.map((size) => (
            <div key={size} className="stock-row">

            <input
              type="checkbox"
              checked={color.inventory.men[size].visible}
              onChange={() => handleVisibilityChange("men", size)}
            />
          
            <span>{size}</span>
          
            <input
              type="number"
              className="inventory-quantity"
              min="0"
              placeholder="0"
              value={color.inventory.men[size].stock}
              onChange={(e) =>
                handleStockChange("men", size, e.target.value)
              }
            />
          
          </div>
        ))}

            <h5
            onClick={() => setShowWomenSizes(!showWomenSizes)}
            style={{ cursor: "pointer" }}
            >
            {showWomenSizes ? "▼" : "▶"} Women's Sizes
            </h5>

            {showWomenSizes &&
            WOMEN_SIZES.map((size) => (
                <div key={size} className="stock-row">

                <input
                  type="checkbox"
                  checked={color.inventory.women[size].visible}
                  onChange={() => handleVisibilityChange("women", size)}
                />
              
                <span>{size}</span>
              
                <input
                  type="number"
                   className="inventory-quantity"
                  min="0"
                  placeholder="0"
                  value={color.inventory.women[size].stock}
                  onChange={(e) =>
                    handleStockChange("women", size, e.target.value)
                  }
                />
              
              </div>
            ))}

        </div>
    );
  }
  
  export default SizeSection;