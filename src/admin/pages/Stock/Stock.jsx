import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import "./Stock.css";
import { toast } from "react-toastify";

function Stock() {

  const [products, setProducts] = useState([]);
  const [openProduct, setOpenProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  const getColorTotalStock = (color) => {
    let total = 0;
  
    const inventory = color?.inventory || {};
  
    Object.values(inventory).forEach(genderInventory => {
      Object.values(genderInventory || {}).forEach(sizeData => {
        total += Number(sizeData?.stock) || 0;
      });
    });
  
    return total;
  };
  
  const getProductTotalStock = (product) => {
    return (product.colors || []).reduce(
      (total, color) => total + getColorTotalStock(color),
      0
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {

    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("id, product_name, colors")
      .order("product_name");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  function toggleProduct(id) {

    setOpenProduct(
      openProduct === id
        ? null
        : id
    );
  }

  function updateStock(
    productId,
    colorIndex,
    gender,
    size,
    value
  ) {

    setProducts(prev =>
      prev.map(product => {

        if (product.id !== productId) {
          return product;
        }

        const updatedColors = [...product.colors];

        const color = {
          ...updatedColors[colorIndex]
        };

        const inventory = {
          ...color.inventory
        };

        const genderInventory = {
          ...(inventory[gender] || {})
        };

        genderInventory[size] = {
          ...(genderInventory[size] || {}),
          stock: Math.max(
            0,
            Number(value) || 0
          )
        };

        inventory[gender] = genderInventory;
        color.inventory = inventory;

        updatedColors[colorIndex] = color;

        return {
          ...product,
          colors: updatedColors
        };

      })
    );
  }


  function markGenderOutOfStock(
    productId,
    colorIndex,
    gender
  ) {
    setProducts(prev =>
      prev.map(product => {
  
        if (product.id !== productId) {
          return product;
        }
  
        const updatedColors = [...product.colors];
  
        const color = {
          ...updatedColors[colorIndex]
        };
  
        const inventory = {
          ...color.inventory
        };
  
        const genderInventory = {
          ...(inventory[gender] || {})
        };
  
        Object.keys(genderInventory).forEach(size => {
  
          genderInventory[size] = {
            ...genderInventory[size],
            stock: 0
          };
  
        });
  
        inventory[gender] = genderInventory;
  
        color.inventory = inventory;
  
        updatedColors[colorIndex] = color;
  
        return {
          ...product,
          colors: updatedColors
        };
  
      })
    );
  }

  async function saveProduct(product) {

    setSaving(product.id);

    const { error } = await supabase
      .from("products")
      .update({
        colors: product.colors
      })
      .eq("id", product.id);

      if (error) {

        console.error(error);
        toast.error("Failed to save stock.");
      
      } else {
      
        toast.success("Stock updated successfully.");

        setOpenProduct(null);
      
      }

    setSaving(null);
  }

  if (loading) {
    return (
      <div className="stock-page">
        <h1>Stock</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="stock-page">

            <h1>Stock</h1>

            <p className="stock-subtitle">
            Manage product inventory
            </p>

      <div className="stock-product-list">

        {products.map(product => (

          <div
            key={product.id}
            className="stock-product"
          >

            <button
            className="stock-product-header"
            onClick={() =>
                toggleProduct(product.id)
            }
            >

            <span
                className={`stock-arrow ${
                openProduct === product.id
                    ? "open"
                    : ""
                }`}
            >
                ›
            </span>

            <img
                className="stock-product-image"
                src={
                product.colors?.[0]?.images?.find(
                    image =>
                    image.id ===
                    product.colors?.[0]?.coverImageId
                )?.url
                }
                alt={product.product_name}
            />

                <div className="stock-product-info">
                <div className="stock-product-title-row">
                    <span className="stock-product-name">
                    {product.product_name}
                    </span>

                    <div className="stock-product-meta">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.colors?.length || 0} Colors</span>
                    </div>
                </div>
                </div>

                <div className="stock-total-stock">
                {getProductTotalStock(product)} Stock
                </div>

            

            </button>


            {openProduct === product.id && (

              <div className="stock-product-content">

                {product.colors?.map(
                  (colorObj, colorIndex) => (

                    <div
                      key={colorObj.id || colorIndex}
                      className="stock-color-section"
                    >

                    <div className="stock-color-header">

                    <div className="stock-color-left">

                    <img
                        src={
                        colorObj.images?.find(
                            image =>
                            image.id ===
                            colorObj.coverImageId
                        )?.url
                        }
                        alt={colorObj.color}
                        className="stock-color-image"
                    />

                    <span>
                        {colorObj.color}
                    </span>

                    </div>

                    <span className="stock-color-total">
                    {getColorTotalStock(colorObj)} Stock
                    </span>

                    </div>


                      {/* MEN */}

                      {colorObj.inventory?.men && (

                        <div className="stock-gender-row">

                        <div className="stock-size-row">

                        {Object.entries(
                            colorObj.inventory.men
                        ).map(([size, data]) => (

                            <div
                            key={size}
                            className="stock-size-item"
                            >

                            <span className="stock-size">
                                {size}
                            </span>

                            <input
                                type="number"
                                min="0"
                                value={data.stock ?? 0}
                                onChange={(e) =>
                                updateStock(
                                    product.id,
                                    colorIndex,
                                    "men",
                                    size,
                                    e.target.value
                                )
                                }
                            />

                            </div>

                        ))}

                        </div>

                        <button
                        className="out-of-stock-btn"
                        onClick={() =>
                            markGenderOutOfStock(
                            product.id,
                            colorIndex,
                            "men"
                            )
                        }
                        >
                        Out of Stock
                        </button>

                        </div>

                      )}


                      {/* WOMEN */}

                      {colorObj.inventory?.women && (

                        <div className="stock-gender-section">

                          <h3>Women</h3>

                          <div className="stock-gender-row">

                            <div className="stock-size-row">

                            {Object.entries(
                                colorObj.inventory.women
                            ).map(([size, data]) => (

                                <div
                                key={size}
                                className="stock-size-item"
                                >

                                <span className="stock-size">
                                    {size}
                                </span>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock ?? 0}
                                    onChange={(e) =>
                                    updateStock(
                                        product.id,
                                        colorIndex,
                                        "women",
                                        size,
                                        e.target.value
                                    )
                                    }
                                />

                                </div>

                            ))}

                            </div>

                            <button
                            className="out-of-stock-btn"
                            onClick={() =>
                                markGenderOutOfStock(
                                product.id,
                                colorIndex,
                                "women"
                                )
                            }
                            >
                            Out of Stock
                            </button>

                            </div>

                        </div>

                      )}

                    </div>

                  )
                )}


                <button
                  className="stock-save-btn"
                  disabled={
                    saving === product.id
                  }
                  onClick={() =>
                    saveProduct(product)
                  }
                >

                  {saving === product.id
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Stock;