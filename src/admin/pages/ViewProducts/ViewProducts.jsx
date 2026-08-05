import "./ViewProducts.css";
import { getProducts } from "../../services/viewProductsService";
import { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";

function ViewProducts() {

    const [products, setProducts] = useState([]);

    

    useEffect(() => {

        async function loadProducts() {
            const { data, error } = await getProducts();

            if (data) {
                setProducts(data);
            }

            if(error){
                console.error(error);
            }
        }

        loadProducts();

    }, []);

    return (
        <div className="view-products-page">
            <h1>All Products</h1>

            <p className="view-products-subtitle">
                Manage, edit and delete your products.
            </p>


            <ProductsTable
                products={products}
                setProducts={setProducts}
            />


    

</div>
        
    );
}

export default ViewProducts;