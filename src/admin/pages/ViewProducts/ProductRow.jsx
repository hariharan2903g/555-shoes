import { useState,useRef } from "react";
import { updateProduct, deleteProduct } from "../../services/viewProductsService";
import { uploadImages } from "../../services/imageService";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import { categoryConfig } from "../../data/categoryConfig";
import { brandConfig } from "../../data/brandConfig";
import { materialConfig } from "../../data/materialConfig";
import EditImagesModal from "../../components/EditImagesModal/EditImagesModal";


function ProductRow({ product, products, setProducts }) {

    const firstColor = product.colors?.[0];

    const coverImage = firstColor?.images?.find(
        image => image.id === firstColor.coverImageId
    );

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({
        top:0,
        left:0,
    });
    const [editedProduct, setEditedProduct] = useState({ ...product, });
    const imageRef = useRef(null);

  
    async function handleToggle(field) {

        const newValue = !product[field];
    
        const { data, error } = await updateProduct(product.id, {
            [field]: newValue,
        });
    
        console.log("Updating:", field);
        console.log("Product ID:", product.id);
        console.log("New Value:", newValue);
        console.log("Response:", data);
        console.log("Error:", error);
    
        if (error) {
            console.error(error);
            return;
        }
    
        setProducts(
            products.map((p) =>
                p.id === product.id
                    ? { ...p, [field]: newValue }
                    : p
            )
        );
    }

    async function handleDelete() {

        setShowDeleteModal(false);
    
        const { error } = await deleteProduct(product.id);
    
        if (error) {
            console.error(error);
            return;
        }
    
        setProducts(
            products.filter((p) => p.id !== product.id)
        );
        
    
    }

    async function handleSave() {

        const productToSave = structuredClone(editedProduct);
    
        for (const color of productToSave.colors) {
    
            const newFiles = color.images.filter(image => image.file);
    
            if (newFiles.length === 0) continue;
    
            const uploadedImages = await uploadImages(
                newFiles.map(image => image.file)
            );
    
            let uploadIndex = 0;
    
            color.images = color.images.map((image) => {

                if (!image.file) {
                    return image;
                }
            
                const uploaded = uploadedImages[uploadIndex++];
            
                return {
                    id: image.id,      // keep original id
                    url: uploaded.url, // replace only the url
                };
            
            });
    
        }
    
        const { error } = await updateProduct(
            product.id,
            productToSave
        );
    
        if (error) {
            console.error(error);
            return;
        }
    
        setProducts(
            products.map((p) =>
                p.id === product.id
                    ? productToSave
                    : p
            )
        );
    
        setEditedProduct(productToSave);
    
        setIsEditing(false);
    
    }
    


    return (

        <>

        <tr>

            <td>

                {coverImage ? (

                    <img
                    ref={imageRef}
                    src={coverImage.url}
                    className={`table-product-image ${isEditing ? "editable-image" : ""}`}
                    alt=""
                    onClick={() => {

                        if (!isEditing) return;
                    
                        const rect = imageRef.current.getBoundingClientRect();
                    
                        setModalPosition({
                    
                            top: rect.top,
                    
                            left: rect.right + 15,
                    
                        });
                    
                        setShowImagesModal(true);
                    
                    }}
                    />

                ) : (

                    "No Image"

                )}

            </td>

            <td>

            {isEditing ? (

                <input
                    type="text"
                    value={editedProduct.product_name}
                    onChange={(e) =>
                        setEditedProduct({
                            ...editedProduct,
                            product_name: e.target.value,
                        })
                    }
                />

            ) : (

                product.product_name

            )}

        </td>

        <td>{product.department}</td>

            <td>

                {isEditing ? (

                    <select
                        value={editedProduct.category}
                        onChange={(e) =>
                            setEditedProduct({
                                ...editedProduct,
                                category: e.target.value,
                            })
                        }
                    >

                        {categoryConfig[editedProduct.department]?.map((category) => (

                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>

                        ))}

                    </select>

                ) : (

                    product.category

                )}

                </td>

                <td>

                    {isEditing ? (

                        <select
                            value={editedProduct.brand}
                            onChange={(e) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    brand: e.target.value,
                                })
                            }
                        >

                            {brandConfig[editedProduct.category]?.map((brand) => (

                                <option
                                    key={brand}
                                    value={brand}
                                >
                                    {brand}
                                </option>

                            ))}

                        </select>

                    ) : (

                        product.brand

                    )}

                    </td>

                    <td>

                    {isEditing ? (

                        <select
                            value={editedProduct.gender}
                            onChange={(e) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    gender: e.target.value,
                                })
                            }
                        >

                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>

                        </select>

                    ) : (

                        product.gender

                    )}

                    </td>

                    <td>

                    {isEditing ? (

                        <select
                            value={editedProduct.material}
                            onChange={(e) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    material: e.target.value,
                                })
                            }
                        >

                            {materialConfig[editedProduct.category]?.map((material) => (

                                <option
                                    key={material}
                                    value={material}
                                >
                                    {material}
                                </option>

                            ))}

                        </select>

                    ) : (

                        product.material

                    )}

                    </td>

                    <td>

                {isEditing ? (

                    <input
                        type="number"
                        value={editedProduct.original_price || ""}
                        onChange={(e) =>
                            setEditedProduct({
                                ...editedProduct,
                                original_price: e.target.value,
                            })
                        }
                    />

                ) : (

                    product.original_price
                        ? `₹${product.original_price}`
                        : "-"

                )}

                </td>

                <td>

                    {isEditing ? (

                        <input
                            type="number"
                            value={editedProduct.selling_price}
                            onChange={(e) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    selling_price: e.target.value,
                                })
                            }
                        />

                    ) : (

                        `₹${product.selling_price}`

                    )}

                    </td>

                    <td>

                        {isEditing ? (

                            <textarea
                                rows={3}
                                value={editedProduct.description}
                                onChange={(e) =>
                                    setEditedProduct({
                                        ...editedProduct,
                                        description: e.target.value,
                                    })
                                }
                            />

                        ) : (

                            product.description.length > 30
                                ? product.description.slice(0, 30) + "..."
                                : product.description

                        )}

                        </td>

            <td
                    onClick={() => handleToggle("featured")}
                    style={{ cursor: "pointer" }}
                >
                    {product.featured ? "⭐" : "☆"}
                </td>

                <td
                    onClick={() => handleToggle("new_arrival")}
                    style={{ cursor: "pointer" }}
                >
                    {product.new_arrival ? "🆕" : "🁂"}
                </td>

                    <td>

                <span
                    className={product.is_active ? "status-badge active" : "status-badge hidden"}
                    onClick={() => handleToggle("is_active")}
                >
                    {product.is_active ? "Active" : "Hidden"}
                </span>
                </td>

                <td>

{isEditing ? (

    <>

        <button
            onClick={handleSave}
        >
            Save
        </button>

        <button
            onClick={() => {
                setEditedProduct({ ...product });
                setIsEditing(false);
            }}
        >
            Cancel
        </button>

    </>

) : (

    <>

        <button
            onClick={() => {
                setEditedProduct({ ...product });
                setIsEditing(true);
            }}
        >
            Edit
        </button>

        <button
            onClick={() => setShowDeleteModal(true)}
        >
            Delete
        </button>

    </>

)}

</td>

        </tr>

        <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Product"
            message={`Are you sure you want to delete "${product.product_name}"?`}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
        />

            <EditImagesModal
                isOpen={showImagesModal}
                editedProduct={editedProduct}
                setEditedProduct={setEditedProduct}
                position={modalPosition}
                onClose={() => setShowImagesModal(false)}
            />


        </>

    );

}

export default ProductRow;