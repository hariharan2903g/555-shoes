import EditProductRow from "./EditProductRow";


function EditProductsTable({
    products,
    startIndex,
    allProducts,
    setProducts
  }) {


  return (

    <div className="edit-products-table-wrapper">

      <table className="edit-products-table">

        <thead>

        <tr>
            <th>S.No.</th>
            <th>Image</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
        </tr>

        </thead>

        <tbody>

          {products.length > 0 ? (

           products.map((product, index) => (
            <EditProductRow
            key={product.id}
            product={product}
            serialNumber={startIndex + index + 1}
            allProducts={allProducts}
            setProducts={setProducts}
          />
            ))

          ) : (

            <tr>

              <td
                colSpan="9"
                className="no-products"
              >
                No products found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}

export default EditProductsTable;