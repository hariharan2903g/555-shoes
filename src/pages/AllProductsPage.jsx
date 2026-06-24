import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function AllProductsPage({ setCartOpen }) {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState( searchParams.get("category") || "All");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All");
  const [selectedGender, setSelectedGender] =
  useState(
    searchParams.get("gender") ||
    "All"
  );  const [selectedActivity, setSelectedActivity] = useState("All");
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
  
  

  const brandFilteredProducts =
  selectedBrand === "All"
    ? products
    : products.filter(
        (product) =>
          product.brand?.toLowerCase() ===
          selectedBrand.toLowerCase()
      );

      const brands = [
        "All",
        ...new Set(
          categoryFilteredProducts
            .map(
              (product) =>
                product.brand
            )
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
  "All",
  ...new Set(
    brandFilteredProducts
      .map(
        (product) =>
          product.category
      )
      .filter(Boolean)
  ),
];

const genders = [
  "All",
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
  "All",
  ...new Set(
    products
      .map(
        (product) =>
          product.activity_type
      )
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

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
      />

      <section className="section">

      <h1 className="products-title">
          Shop All Products
        </h1>

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="search-input"
        />

        <div className="products-toolbar">

        <button
          className="filter-btn"
          onClick={() =>
            setFilterOpen(true)
          }
        >
          Filters ⚙
        </button>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="sort-select"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>

          <option value="az">
            A → Z
          </option>

          <option value="za">
            Z → A
          </option>

        </select>

        </div>

        {filterOpen && (
          

<div className="filter-drawer">

  <div className="filter-header">

    <h2>Product Filters</h2>

    <button
      className="close-filter"
      onClick={() =>
        setFilterOpen(false)
      }
    >
      ✕
    </button>

  </div>

  <select
  value={selectedCategory}
  onChange={(e) =>
    setSelectedCategory(
      e.target.value
    )
  }
>
<option value="All">
    Category
  </option>

  {categories.map(
    (category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    )
  )}
</select>


  <select
    value={selectedBrand}
    onChange={(e) =>
      setSelectedBrand(
        e.target.value
      )
    }
  >
    <option value="All">
      Brand
    </option>
    {brands.map((brand) => (

      <option
        key={brand}
        value={brand}
      >
        {brand}
      </option>

    ))}
  </select>

  <select
  value={selectedSize}
  onChange={(e) =>
    setSelectedSize(
      e.target.value
    )
  }
>

  <option value="All">
    Size
  </option>

  {sizes.map((size) => (

    <option
      key={size}
      value={size}
    >
      {size}
    </option>

  ))}

</select>


<select
  value={selectedColor}
  onChange={(e) =>
    setSelectedColor(
      e.target.value
    )
  }
>

  <option value="All">
    Color
  </option>

  {colors.map((color) => (

    <option
      key={color}
      value={color}
    >
      {color}
    </option>

  ))}

</select>

  <select
  value={selectedGender}
  onChange={(e) =>
    setSelectedGender(
      e.target.value
    )
  }
>
<option value="All">
  Gender
</option>

  {genders.map(
    (gender) => (

      <option
        key={gender}
        value={gender}
      >
        {gender}
      </option>

    )
  )}

</select>

<select
  value={selectedActivity}
  onChange={(e) =>
    setSelectedActivity(
      e.target.value
    )
  }
>
<option value="All">
  Activity Type
</option>

  {activities.map(
    (activity) => (

      <option
        key={activity}
        value={activity}
      >
        {activity}
      </option>

    )
  )}

</select>

<select
  value={selectedDiscount}
  onChange={(e) =>
    setSelectedDiscount(
      e.target.value
    )
  }
>

  <option value="All">
    Discounts
  </option>

  <option value="10">
    10%+ Off
  </option>

  <option value="20">
    20%+ Off
  </option>

  <option value="30">
    30%+ Off
  </option>

  <option value="50">
    50%+ Off
  </option>

</select>

<button
  className="clear-filters-btn"
  onClick={() => {

    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedGender("All");
    setSelectedActivity("All");
    setSelectedDiscount("All");
    setSelectedSize("All");
    setSelectedColor("All");
  }}
>
  Clear All Filters ✕
</button>

  <button
    className="show-products-btn"
    onClick={() =>
      setFilterOpen(false)
    }
  >
    Show {filteredProducts.length}
    Products
  </button>

</div>

)}

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

        <div className="category-products-grid">

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

                  <button>
                    View Product
                  </button>
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

        <button>
          View Product
        </button>
      </div>
    </div>

  ))}

</div>

</>

)}

        
      </section>

      <Footer />
    </>
  );
}

export default AllProductsPage;