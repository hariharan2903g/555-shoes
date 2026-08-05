import ProductRow from "./ProductRow";

function ProductsTable({ products, setProducts }) {

    

    return (

        <div className="products-table-container">

            <table className="products-table">

            <thead>
    <tr>

        <th>Image</th>
        <th>Name</th>
        <th>Department</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Gender</th>
        <th>Material</th>
        <th>Original Price</th>
        <th>Selling Price</th>
        <th>Description</th>
        <th>⭐Featured</th>
        <th>New Arrival</th>
        <th>Status</th>
        <th>Actions</th>

    </tr>
</thead>

                <tbody>

                    {products.map(product => (

                        <ProductRow
                        key={product.id}
                        product={product}
                        products={products}
                        setProducts={setProducts}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ProductsTable;