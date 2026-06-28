import { useState, useEffect } from "react";
import { Funnel, ArrowUpDown } from "lucide-react";
import { supabase } from "../supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ProductHeader from "../components/ProductHeader";
import ActiveFilters from "../components/ActiveFilters";
import SortDrawer from "../components/SortDrawer";
import FilterDrawer from "../components/FilterDrawer";

function AllProductsPage({ setCartOpen }) {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState( searchParams.get("category") || "All");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All");
  const [selectedGender, setSelectedGender] = useState(searchParams.get("gender") || "All");  
  const [selectedActivity, setSelectedActivity] = useState("All");
  const [selectedStrapType, setSelectedStrapType] = useState("All");
  const [selectedDiscount, setSelectedDiscount] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const urlGender = searchParams.get("gender");
  const urlCategory = searchParams.get("category");
  const urlSubcategory = searchParams.get("subcategory");
  // const [relatedProducts, setRelatedProducts] = useState([]);
 

  // const relatedProducts =
  // products
  //   .sort(() => 0.5 - Math.random())
  //   .slice(0, 10);

  const [selectedSubcategory, setSelectedSubcategory] =
  useState(
    searchParams.get("subcategory") ||
    "All"
  );

  const relatedProducts =
  products
    .filter(
      product =>
        product.category === selectedCategory
    )
    .slice(0, 6);

  const [sortBy, setSortBy] =
    useState("newest");

    const [gridView, setGridView] =
  useState("2");
  
  const [searchTerm, setSearchTerm] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

    const categoryFilteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category ===
            selectedCategory
        );

        const pageTitle =
        selectedSubcategory !== "All"
          ? selectedSubcategory
          : selectedCategory !== "All"
          ? selectedCategory
          : "All Products";
  
  

  const brandFilteredProducts =
  selectedBrand === "All"
    ? products
    : products.filter(
        (product) =>
          product.brand?.toLowerCase() ===
          selectedBrand.toLowerCase()
      );

      const brands = [
        ...new Set(
          products
            .filter(p => {
      
              if (
                selectedCategory !== "All" &&
                p.category !== selectedCategory
              )
                return false;
      
              if (
                selectedSubcategory !== "All" &&
                p.subcategory !== selectedSubcategory
              )
                return false;
      
              return true;
      
            })
            .map(p => p.brand)
            .filter(Boolean)
        ),
      ];

      const sizes = [
        "All",
        ...new Set(
          products
            .flatMap(
              (product) =>
                product.sizes
                  ? product.sizes.split(",")
                  : []
            )
            .map((size) => size.trim())
        ),
      ];

      const colors = [
        "All",
        ...new Set(
          products
            .flatMap(
              (product) =>
                product.colors
                  ? product.colors.split(",")
                  : []
            )
            .map((color) => color.trim())
        ),
      ];
  

      // useEffect(() => {

      //   if (
      //     selectedBrand !== "All" &&
      //     !brands.includes(selectedBrand)
      //   ) {
      //     setSelectedBrand("All");
      //   }
      
      // }, [
      //   selectedCategory,
      //   brands,
      //   selectedBrand,
      // ]);

      // useEffect(() => {

      //   if (
      //     selectedCategory !== "All" &&
      //     !categories.includes(
      //       selectedCategory
      //     )
      //   ) {
      //     setSelectedCategory("All");
      //   }
      
      // }, [
      //   selectedBrand,
      //   categories,
      //   selectedCategory,
      // ]);

const categories = [
  
  ...new Set(
    brandFilteredProducts
      .map(
        (product) =>
          product.category
      )
      .filter(Boolean)
  ),
];

const subcategories = [
  ...new Set(
    products
      .filter(
        p =>
          selectedCategory === "All" ||
          p.category === selectedCategory
      )
      .map(p => p.subcategory)
      .filter(Boolean)
  ),
];

const genders = [
  
  ...new Set(
    products
      .map(
        (product) =>
          product.gender
      )
      .filter(Boolean)
  ),
];

const activities = [
  ...new Set(
    products
      .filter(p => {

        if (p.category !== "Shoes")
          return false;

        if (
          selectedSubcategory !== "All" &&
          p.subcategory !== selectedSubcategory
        )
          return false;

        if (
          selectedBrand !== "All" &&
          p.brand !== selectedBrand
        )
          return false;

        return true;

      })
      .map(p => p.activity_type)
      .filter(Boolean)
  ),
]; 

const strapTypes = [
  ...new Set(
    products
      .filter(p => {

        if (p.category !== "Watches")
          return false;

        if (
          selectedSubcategory !== "All" &&
          p.subcategory !== selectedSubcategory
        )
          return false;

        if (
          selectedBrand !== "All" &&
          p.brand !== selectedBrand
        )
          return false;

        return true;

      })
      .map(p => p.Strap_Type)
      .filter(Boolean)
  ),
];


  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  },
  [
    products,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    sortBy,
    searchTerm,
    selectedGender,
    selectedActivity,
    selectedDiscount,
    selectedSize,
    selectedColor,
  ]
);



useEffect(() => {

  setSelectedCategory(
    searchParams.get("category") || "All"
  );

  setSelectedGender(
    searchParams.get("gender") || "All"
  );

  setSelectedSubcategory(
    searchParams.get("subcategory") ||
    "All"
  );

  setSelectedBrand(
    searchParams.get("brand") || "All"
  );

},  [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (!error) {
      setProducts(data);
    }
  }

  useEffect(() => {

    document.body.style.overflow =
      filterOpen || sortOpen
        ? "hidden"
        : "auto";
  
    return () => {
      document.body.style.overflow = "auto";
    };
  
  }, [filterOpen, sortOpen]);
    

  function filterProducts() {

    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
    }

    if (selectedSubcategory !== "All") {

      result = result.filter(
        (product) =>
          product.subcategory ===
          selectedSubcategory
      );
    
    }

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    if (selectedBrand !== "All") {
      result = result.filter(
        (product) =>
          product.brand?.toLowerCase() ===
          selectedBrand.toLowerCase()
      );
    }

    if (selectedSize !== "All") {

      result = result.filter(
        (product) =>
          product.sizes
            ?.split(",")
            .map((size) => size.trim())
            .includes(selectedSize)
      );
    
    }

    if (selectedColor !== "All") {

      result = result.filter(
        (product) =>
          product.colors
            ?.split(",")
            .map((color) => color.trim())
            .includes(selectedColor)
      );
    
    }

    if (selectedStrapType !== "All") {

      result = result.filter(
        product =>
          product.Strap_Type ===
          selectedStrapType
      );
    
    }

    if (selectedGender === "Men") {

      result = result.filter(
        (product) =>
          product.gender === "Men" ||
          product.gender === "Unisex"
      );
    
    }
    
    else if (
      selectedGender === "Women"
    ) {
    
      result = result.filter(
        (product) =>
          product.gender === "Women" ||
          product.gender === "Unisex"
      );
    
    }
    
    else if (
      selectedGender === "Unisex"
    ) {
    
      result = result.filter(
        (product) =>
          product.gender === "Unisex"
      );
    
    }
    
   
    
    if (selectedActivity !== "All") {
      result = result.filter(
        (product) =>
          product.activity_type ===
          selectedActivity
      );
    }

    if (selectedDiscount !== "All") {

      result = result.filter(
        (product) =>
          Number(
            product.discount_percent || 0
          ) >= Number(selectedDiscount)
      );
    
    }

    if (sortBy === "low") {
      result.sort(
        (a, b) =>
          Number(
            String(a.price).replace(/[^\d]/g, "")
          ) -
          Number(
            String(b.price).replace(/[^\d]/g, "")
          )
      );
    }


    if (sortBy === "high") {
      result.sort(
        (a, b) =>
          Number(
            String(b.price).replace(/[^\d]/g, "")
          ) -
          Number(
            String(a.price).replace(/[^\d]/g, "")
          )
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );
    }

    if (sortBy === "az") {
      result.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name
          )
      );
    }
    
    if (sortBy === "za") {
      result.sort(
        (a, b) =>
          b.name.localeCompare(
            a.name
          )
      );
    }

    setFilteredProducts(result);
  }

   if (sortBy === "popular") {
      filteredProducts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
      />

<div className="products-banner">
  🚚 FREE DELIVERY ON ORDERS ABOVE ₹2000
</div>
      <section className="section">

      <ProductHeader
    pageTitle={pageTitle}
      />

<ActiveFilters

selectedGender={selectedGender}
selectedCategory={selectedCategory}
selectedSubcategory={selectedSubcategory}

setSelectedGender={setSelectedGender}
setSelectedCategory={setSelectedCategory}
setSelectedSubcategory={setSelectedSubcategory}

/>

<div className="top-category-pills">

<button
className={selectedCategory==="All" ? "active-pill" : ""}
onClick={()=>setSelectedCategory("All")}
>
All
</button>

{categories.map(category=>(

<button
key={category}
className={
selectedCategory===category
? "active-pill"
: ""
}
onClick={()=>setSelectedCategory(category)}
>
{category}
</button>

))}

</div>

      <div className="grid-toggle">

      <button
        className={
          gridView === "2"
            ? "active-grid"
            : ""
        }
        onClick={() =>
          setGridView("2")
        }
      >
        ▦
      </button>

      <button
        className={
          gridView === "3"
            ? "active-grid"
            : ""
        }
        onClick={() =>
          setGridView("3")
        }
      >
        ▥
      </button>

      </div>


      {filterOpen && (
<div
  className="drawer-overlay"
  onClick={() =>
    setFilterOpen(false)
  }
/>
)}

<SortDrawer

sortOpen={sortOpen}
setSortOpen={setSortOpen}

sortBy={sortBy}
setSortBy={setSortBy}

/>

<FilterDrawer

filterOpen={filterOpen}
setFilterOpen={setFilterOpen}

products={products}
filteredProducts={filteredProducts}

categories={categories}
subcategories={subcategories}
brands={brands}
activities={activities}
strapTypes={strapTypes}

selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}

selectedSubcategory={selectedSubcategory}
setSelectedSubcategory={setSelectedSubcategory}

selectedBrand={selectedBrand}
setSelectedBrand={setSelectedBrand}

selectedGender={selectedGender}
setSelectedGender={setSelectedGender}

selectedActivity={selectedActivity}
setSelectedActivity={setSelectedActivity}

selectedStrapType={selectedStrapType}
setSelectedStrapType={setSelectedStrapType}

selectedDiscount={selectedDiscount}
setSelectedDiscount={setSelectedDiscount}

/>


        <p className="product-count">
            Showing {
              filteredProducts.length
            } Products
          </p>

          {filteredProducts.length === 0 && (

          <div className="no-products">

            <h2>
              No Products Found
            </h2>

            <p>
              Try changing your filters
              or explore related products
              below.
            </p>

          </div>

          )}

          <div
            className={
              gridView === "2"
                ? "category-products-grid"
                : "category-products-grid-3"
            }
          >

          {filteredProducts.map(
            (product) => (
              <div
                key={product.id}
                className="product-category-card"
                onClick={() =>
                  navigate(
                    `/product/${product.id}`
                  )
                }
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                />

                <div className="product-category-info">
                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    ₹{product.price}
                  </p>

                  {/* <button>
                    View Product
                  </button> */}
                </div>
              </div>
            )
          )}
           </div>

          {filteredProducts.length === 0 && (
<>

  <h2 className="related-title">
    Related Products
  </h2>

  <div className="related-products-grid">

  {relatedProducts.map((product) => (

    <div
      key={product.id}
      className="product-category-card"
      onClick={() =>
        navigate(`/product/${product.id}`)
      }
    >
      <img
        src={product.image_url}
        alt={product.name}
      />

      <div className="product-category-info">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>

        {/* <button>
          View Product
        </button> */}
      </div>
    </div>

  ))}

</div>

</>

)}

        
      </section>
      <div className="bottom-actions">

<button
  className="bottom-filter-btn"
  onClick={() => setFilterOpen(true)}
>
  <Funnel size={20} />
  <span>Filter</span>
</button>

<button
  className="bottom-sort-btn"
  onClick={() => setSortOpen(true)}
>
  <ArrowUpDown size={20} />
  <span>Sort</span>
</button>

</div>

      <Footer />
    </>
  );
}

export default AllProductsPage;