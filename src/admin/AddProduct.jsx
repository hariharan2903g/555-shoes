import "./styles/AddProduct.css";
import { useState } from "react";
import BasicInfo from "./components/BasicInfo";
import Pricing from "./components/Pricing";
import Colors from "./components/Colors";
import ProductDetails from "./components/ProductDetails";
import Description from "./components/Description";
import SaveProduct from "./components/SaveProduct";
import { addProduct } from "./services/productService";
import { validateProduct } from "./services/validationService";
import { toast } from "react-toastify";
import { prepareProductImages } from "./services/productImageService";

function AddProduct() {
    const [product, setProduct] = useState({
        product_name: "",
        brand: "",
        department: "",
        category: "",
        gender: "",
        material: "",
        occasion: "",
        selling_price: "",
        original_price: "",
        features: "",
        description:"",
        featured:false,
        is_active:true,
        colors: [],
        specifications: {},
      });

      const [isSaving, setIsSaving] = useState(false);

      const handleSave = async () => {

        if (isSaving) return;

const validationError = validateProduct(product);

if (validationError) {
    toast.error(validationError);
    return;
}

setIsSaving(true);

        try {
            const {
                updatedColors,
                uploadedImages,
              } = await prepareProductImages(product.colors);
              
              const productToSave = {
                ...product,
                colors: updatedColors,
              };

              console.log("Before Save:", productToSave.original_price);
              console.log("Selling:", productToSave.selling_price);
              console.log(product);
            
            const { data, error } = await addProduct(productToSave);
            console.log(data);
      
          if (error) throw error;
      
          toast.success("Product added successfully!");
            console.log("Product Saved:", data);

            setProduct({
                product_name: "",
                brand: "",
                department: "",
                category: "",
                gender: "",
                material: "",
                occasion: "",
                selling_price: "",
                original_price: "",
                features: "",
                description: "",
                featured: false,
                is_active: true,
                colors: [],
                specifications: {},
            });
      
        } 
        catch (err) {

            if (uploadedImages) {
                await deleteImages(uploadedImages);
            }

            console.error(err);
            toast.error("Failed to save product.");
        }
        finally {
            setIsSaving(false);
        }
      };


  return (
    <div className="add-product-page">
      <h1>Add Product</h1>

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

        <SaveProduct
            onSave={handleSave}
            isSaving={isSaving}
        />

    </div>
  );
}

export default AddProduct;