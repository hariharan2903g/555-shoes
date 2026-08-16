import "./EditProduct.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { prepareProductImages } from "../../services/productImageService";
import BasicInfo from "../../components/BasicInfo";
import Pricing from "../../components/Pricing";
import Colors from "../../components/Colors";
import ProductDetails from "../../components/ProductDetails";
import Description from "../../components/Description";

import { getProductById, updateProduct } from "../../services/productService";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {

    async function loadProduct() {

      setIsLoading(true);

      const { data, error } = await getProductById(id);

      if (error) {
        console.error(error);
        toast.error("Failed to load product.");
        navigate("/admin/edit-products");
        return;
      }

      setProduct(data);
      setIsLoading(false);
    }

    loadProduct();

  }, [id, navigate]);


  const handleSave = async () => {

    if (isSaving) return;
  
    setIsSaving(true);
  
    try {
  
      const {
        updatedColors,
        uploadedImages,
      } = await prepareProductImages(
        product.colors
      );
  
      const productToUpdate = {
        ...product,
        colors: updatedColors,
      };
  
      const { error } = await updateProduct(
        id,
        productToUpdate
      );
  
      if (error) {
        throw error;
      }
  
      toast.success(
        "Product updated successfully!"
      );
  
      navigate("/admin/edit-products");
  
    } catch (error) {
  
      console.error(error);
  
      toast.error(
        "Failed to update product."
      );
  
    } finally {
  
      setIsSaving(false);
  
    }
  
  };


  if (isLoading) {

    return (
      <div className="edit-product-page">

        <h1>Loading Product...</h1>

      </div>
    );

  }


  if (!product) {
    return null;
  }


  return (

    <div className="edit-product-page">

      <div className="edit-product-header">

        <div>

          <h1>Edit Product</h1>

          <p>
            Update every detail of this product.
          </p>

        </div>

        <button
          className="edit-back-btn"
          onClick={() =>
            navigate("/admin/edit-products")
          }
        >
          ← Back
        </button>

      </div>


      <div className="admin-layout">

        <div className="left-column">

          <BasicInfo
            product={product}
            setProduct={setProduct}
          />

          <Pricing
            product={product}
            setProduct={setProduct}
          />

        </div>


        <div className="right-column">

          <ProductDetails
            product={product}
            setProduct={setProduct}
          />

          <Description
            product={product}
            setProduct={setProduct}
          />

        </div>

      </div>


      <Colors
        product={product}
        setProduct={setProduct}
      />


      <div className="edit-product-save-section">

        <button
          className="save-product-btn"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>

  );
}

export default EditProduct;