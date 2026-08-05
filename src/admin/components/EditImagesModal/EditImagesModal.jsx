import "./EditImagesModal.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ColorCard from "../ColorCard";


function EditImagesModal({

    isOpen,
    editedProduct,
    setEditedProduct,
    position,
    onClose,

}){

   
    console.log(editedProduct);

    const [expandedColor, setExpandedColor] = useState(null);
    const [tempProduct, setTempProduct] = useState(editedProduct);

    useEffect(() => {

        if (isOpen) {
            setTempProduct(structuredClone(editedProduct));
        }
    
    }, [isOpen, editedProduct]);

    useEffect(() => {

        if (isOpen) {
    
            const clonedProduct = structuredClone(editedProduct);
    
            setTempProduct(clonedProduct);
    
            if (clonedProduct.colors.length === 1) {
    
                setExpandedColor(clonedProduct.colors[0].id);
    
            } else {
    
                setExpandedColor(null);
    
            }
    
        }
    
    }, [isOpen, editedProduct]);

    if (!isOpen) return null;

    return createPortal(

        <div className="modal-overlay">

        <div
            className="modal"
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
            }}
        >
    
    

<div className="modal-header">

    <h2>Edit Images</h2>

    <button
        className="close-modal"
        onClick={onClose}
    >
        ✕
    </button>

</div>

<div className="image-editor-container">

    {tempProduct.colors?.map((color) => (

        <div
            key={color.id}
            className="color-editor"
        >

            <ColorCard
                color={color}
                product={tempProduct}
                setProduct={setTempProduct}
                isExpanded={expandedColor === color.id}
                toggleExpand={() =>
                    setExpandedColor(
                        expandedColor === color.id
                            ? null
                            : color.id
                    )
                }
                imageOnly={true}
            />

        </div>

    ))}

</div>

<div className="modal-actions">

    <button
        className="secondary-btn"
        onClick={onClose}
    >
        Cancel
    </button>

    <button
        className="admin-btn"
        onClick={() => {

            setEditedProduct(tempProduct);
            onClose();

        }}
    >
        Save
    </button>

</div>

</div>

    
        </div>,
    
        document.body
    
    );

}

export default EditImagesModal;