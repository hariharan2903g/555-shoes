import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { deleteProduct } from "../../services/viewProductsService";
import { toast } from "react-toastify";

function EditProductRow({
    product,
    serialNumber,
    allProducts,
    setProducts
  }) {

  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const firstColor =
    product.colors?.[0];

  const coverImage =
    firstColor?.images?.find(
      image =>
        image.id ===
        firstColor.coverImageId
    );

    const handleDelete = async () => {

      const { error } = await deleteProduct(product.id);
    
      if (error) {
        console.error(error);
        toast.error("Failed to delete product");
        return;
      }
    
      setProducts(
        allProducts.filter(
          item => item.id !== product.id
        )
      );
    
      setShowDeleteConfirm(false);
    
      toast.success("Product deleted successfully");
    };


  /*
    Calculate total stock
    from existing inventory structure
  */

  const getTotalStock = () => {

    let total = 0;

    product.colors?.forEach(color => {

      const inventory =
        color.inventory || {};

      Object.values(inventory).forEach(
        genderInventory => {

          Object.values(
            genderInventory || {}
          ).forEach(sizeData => {

            total +=
              Number(sizeData?.stock) || 0;

          });

        }
      );

    });

    return total;
  };


  return (
    <>
    <tr>

        <td className="serial-number">
        {serialNumber}
        </td>

      <td>

        {coverImage ? (

          <img
            src={coverImage.url}
            alt={product.product_name}
            className="edit-table-product-image"
          />

        ) : (

          <div className="edit-table-no-image">
            —
          </div>

        )}

      </td>


      <td className="edit-product-name">

        {product.product_name}

      </td>


      <td>

        {product.brand || "—"}

      </td>


      <td>

        {product.category || "—"}

      </td>


      <td>

        {product.gender || "—"}

      </td>


      <td>

        ₹{product.selling_price}

      </td>


      <td>

        <span className="edit-stock-value">
          {getTotalStock()}
        </span>

      </td>


      <td>

      <div className="product-actions">

<button
  className="edit-product-btn"
  onClick={() =>
    navigate(`/admin/edit-product/${product.id}`)
  }
>
  Edit
</button>

<button
  className="delete-product-btn"
  onClick={() => setShowDeleteConfirm(true)}
>
  Delete
</button>

</div>

      </td>

      </tr>
      {showDeleteConfirm &&
      createPortal(

        <div className="edit-delete-overlay">

          <div className="edit-delete-modal">

            <h3>Delete Product?</h3>

            <p>
              Delete{" "}
              <strong>
                {product.product_name}
              </strong>
              ?
            </p>

            <div className="edit-delete-actions">

              <button
               className="edit-delete-cancel"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                className="edit-delete-confirm"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>,

        document.body

      )
    }

  </>
);


}

export default EditProductRow;