import { useRef, useState } from "react";
import { uploadImages, deleteImage, } from "../services/imageService";
import SizeSection from "./SizeSection";

function ColorCard({
  color,
  product,
  setProduct,
  isExpanded,
  toggleExpand,
  imageOnly = false,
}) {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [isExpanded, setIsExpanded] = useState(true);

  // const toggleExpand = () => {
  //   setIsExpanded((prev) => !prev);
  // };

    const handleDeleteColor = () => {
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.filter(
            (item) => item.id !== color.id
          ),
        }));
      };
    
    const handleColorChange = (e) => {
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) =>
            item.id === color.id
              ? { ...item, color: e.target.value }
              : item
          ),
        }));
      };

      const handleImageSelect = (imageId) => {
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) =>
            item.id === color.id
              ? {
                  ...item,
                  selectedImageId: imageId,
                }
              : item
          ),
        }));
      };

      const handleMakeCover = () => {
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) =>
            item.id === color.id
              ? {
                  ...item,
                  coverImageId: item.selectedImageId,
                }
              : item
          ),
        }));
      };

      const handleDeleteImage = async () => {
        const image = color.images.find(
          (img) => img.id === color.selectedImageId
        );
      
        if (!image) return;
      
        const success = await deleteImage(image.url);
      
        if (!success) return;
      
        setProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((item) => {
            if (item.id !== color.id) return item;
      
            const updatedImages = item.images.filter(
              (img) => img.id !== image.id
            );
      
            const selectedImageId =
              item.selectedImageId === image.id
                ? updatedImages[0]?.id ?? null
                : item.selectedImageId;
      
            const coverImageId =
              item.coverImageId === image.id
                ? updatedImages[0]?.id ?? null
                : item.coverImageId;
      
            return {
              ...item,
              images: updatedImages,
              selectedImageId,
              coverImageId,
            };
          }),
        }));
      
        console.log("Deleted from Storage");
      };

      const showDeleteConfirmation = () => {
        setShowDeleteConfirm(true);
    };
      
    const cancelDelete = () => {
      setShowDeleteConfirm(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length === 0) return;
  
    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
  
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.map((item) => {
        if (item.id !== color.id) return item;
  
        const images = [...item.images, ...newImages];
  
        return {
          ...item,
          images,
          selectedImageId: item.selectedImageId ?? images[0].id,
          coverImageId: item.coverImageId ?? images[0].id,
        };
      }),
    }));
  };

  const fileInputRef = useRef(null);

const coverImage = color.images.find(
  (img) => img.id === color.coverImageId
);

    return (

        
      <div className="color-card">

<div className={showDeleteConfirm ? "color-content dimmed" : "color-content"}>

            <div className="color-card-header">

            <div
                  className="color-header-left"
                  onClick={toggleExpand}
                  style={{ cursor: "pointer" }}
              >

<div className={`color-thumbnail ${imageOnly ? "modal-thumbnail" : ""}`}>

{coverImage ? (

    <img
        src={coverImage.preview || coverImage.url}
        alt={color.color}
        className="cover-thumbnail"
    />

) : (

    "No Image"

)}

</div>

                <h3>
                {isExpanded ? "▼ " : "▶ "}
                {color.color
                    ? color.color.charAt(0).toUpperCase() + color.color.slice(1)
                    : "Unnamed Color"}
                </h3>

            </div>

            {isExpanded && !imageOnly && (
              <button
                  type="button"
                  className="delete-color-btn"
                  onClick={showDeleteConfirmation}
              >
                  🗑
              </button>
              )}

            </div>
  
            {isExpanded && (
              <>

    {!imageOnly && (
            
        <div className="form-group">
          <label>Color</label>
  
       <input
        type="text"
        placeholder="Enter color name"
        value={color.color}
        onChange={handleColorChange}
        />
        </div>
    )}
  
        <div className="images-section">
  
        {!imageOnly && <h4>Images</h4>}

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            hidden
            onChange={handleImageUpload}
            />
  
          <div className="image-grid">

          {color.images.map((image) => (
            <div
            key={image.id}
                className={`image-box
                    ${color.selectedImageId === image.id ? "selected" : ""}
                    ${color.coverImageId === image.id ? "cover-image" : ""}
                  `}
                onClick={() => handleImageSelect(image.id)}
            >
                <img
                    src={image.preview || image.url}
                    alt={color.color}
                    className="uploaded-image"
                    />
            </div>
            ))}

            <div
            className="image-box add-image"
            onClick={() => fileInputRef.current.click()}
            >
            +
            </div>

</div>

{color.selectedImageId !== null && (
    
    <div className="image-actions">

    <button
    className="admin-btn"
    onClick={handleMakeCover}
    >
    ⭐ Make Cover
    </button>

    <button
        className="delete-btn"
        onClick={handleDeleteImage}
        >
        🗑 Delete
        </button>

  </div>
)}

   </div>

   {!imageOnly && (
   
        <SizeSection
        color={color}
        product={product}
        setProduct={setProduct}
        />
   )}
        
        </>

        )}
        
      </div>
      

{showDeleteConfirm && (
  
  <div className="delete-overlay">

    <div className="delete-modal">

      <h3>Delete Color?</h3>

      <p>
        Delete <strong>{color.color || "this color"}</strong>?
      </p>

      <div className="delete-confirm-actions">

        <button
          className="secondary-btn"
          onClick={cancelDelete}
        >
          Cancel
        </button>

        <button
          className="delete-btn"
          onClick={handleDeleteColor}
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}



</div>

    );
  }
  
  export default ColorCard;