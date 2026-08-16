import { useEffect, useState } from "react";
import { getProducts } from "../../services/viewProductsService";
import EditProductsTable from "./EditProductsTable";
import "./EditProducts.css";

function EditProducts() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 20;

  useEffect(() => {

    async function loadProducts() {

      const { data, error } = await getProducts();

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data || []);
    }

    loadProducts();

  }, []);


  /*
    Get unique brands
  */

  const brands = [
    "All",
    ...new Set(
      products
        .map(product => product.brand)
        .filter(Boolean)
    )
  ];


  /*
    Get unique categories
  */

  const categories = [
    "All",
    ...new Set(
      products
        .map(product => product.category)
        .filter(Boolean)
    )
  ];


  /*
    Search + filters
  */

  const filteredProducts = products.filter(product => {

    const searchText =
      search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      product.product_name
        ?.toLowerCase()
        .includes(searchText);

    const matchesBrand =
      selectedBrand === "All" ||
      product.brand === selectedBrand;

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesCategory
    );

  });


  /*
    Pagination
  */

  const totalPages = Math.ceil(
    filteredProducts.length /
    PRODUCTS_PER_PAGE
  );


  const startIndex =
    (currentPage - 1) *
    PRODUCTS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );


  /*
    Reset page whenever
    search/filter changes
  */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedBrand,
    selectedCategory
  ]);


  return (

    <div className="edit-products-page">

      <div className="edit-products-header">

        <h1>Edit Products</h1>

        <p>
          Search and edit your products.
        </p>

      </div>


      {/* Filters */}

      <div className="edit-products-filters">

        <div className="edit-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={selectedBrand}
          onChange={(e) =>
            setSelectedBrand(e.target.value)
          }
        >

          {brands.map(brand => (

            <option
              key={brand}
              value={brand}
            >
              {brand === "All"
                ? "All Brands"
                : brand}
            </option>

          ))}

        </select>


        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >

          {categories.map(category => (

            <option
              key={category}
              value={category}
            >
              {category === "All"
                ? "All Categories"
                : category}
            </option>

          ))}

        </select>

      </div>


      {/* Table */}

      <EditProductsTable
        products={paginatedProducts}
        startIndex={startIndex}
        allProducts={products}
        setProducts={setProducts}
        />


      {/* Pagination */}

      {totalPages > 1 && (

            <div className="edit-products-pagination">

            <button
            disabled={currentPage === 1}
            onClick={() =>
                setCurrentPage(prev => prev - 1)
            }
            >
            ← Previous
            </button>


            <div className="page-numbers">

            {Array.from(
                { length: totalPages || 1 },
                (_, index) => index + 1
            ).map(page => (

                <button
                key={page}
                className={
                    currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                    setCurrentPage(page)
                }
                >
                {page}
                </button>

            ))}

            </div>


            <button
            disabled={
                currentPage === totalPages ||
                totalPages === 0
            }
            onClick={() =>
                setCurrentPage(prev => prev + 1)
            }
            >
            Next →
            </button>

            </div>

            

      )}



    </div>

  );

}

export default EditProducts;