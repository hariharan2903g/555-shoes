import { useState, useEffect, useMemo } from "react";
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
import ProductCard from "../components/ProductCard/ProductCard";
import "./AllProductsPage.css";
// import DeliveryBanner from "../components/DeliveryBanner";
// import AddressSheet from "../pages/AddressPage";

function AllProductsPage({ setCartOpen }) {

  const navigate = useNavigate();
  // const [showAddressSheet,setShowAddressSheet] = useState(false);
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
  const urlBestFor = searchParams.get("best_for");
  const urlMovement = searchParams.get("movement");
const urlDisplayType = searchParams.get("display_type");
const urlMaterial = searchParams.get("material");

const urlCrocsType = searchParams.get("crocs_type");
const urlSliderType = searchParams.get("slider_type");
const urlSandalType = searchParams.get("sandal_type");
const urlAccessoryType = searchParams.get("accessory_type");
const isCrocs = searchParams.get("category") === "Crocs";

  const [selectedBestFor, setSelectedBestFor] =
  useState(
    searchParams.get("best_for") ||
    "All"
  );

  const [selectedMovement, setSelectedMovement] =
useState(urlMovement || "All");

const [selectedDisplayType, setSelectedDisplayType] =
useState(urlDisplayType || "All");

const [selectedMaterial, setSelectedMaterial] =
useState(urlMaterial || "All");

const [selectedCrocsType, setSelectedCrocsType] =
useState(urlCrocsType || "All");

const [selectedSliderType, setSelectedSliderType] =
useState(urlSliderType || "All");

const [selectedSandalType, setSelectedSandalType] =
useState(urlSandalType || "All");

const [selectedAccessoryType, setSelectedAccessoryType] =
useState(urlAccessoryType || "All");

  const relatedProducts =
    products
        .filter((product) => {

            if (
                selectedCategory !== "All" &&
                product.category !== selectedCategory
            ) {
                return false;
            }

            return true;
        })
        .slice(0, 8);

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
        selectedBestFor !== "All"
          ? selectedBestFor
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
          products.flatMap(product =>
            product.colors
              ? product.colors.map(color => color.color)
              : []
          )
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

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}, []);


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
    selectedBestFor,
    selectedMovement,
    selectedDisplayType,
    selectedMaterial,
    selectedCrocsType,
    selectedSliderType,
    selectedSandalType,
    selectedAccessoryType,
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

  setSelectedBestFor(
    searchParams.get("best_for") ||
    "All"
  );

  setSelectedMovement(
    searchParams.get("movement") || "All"
  );
  
  setSelectedDisplayType(
    searchParams.get("display_type") || "All"
  );
  
  setSelectedMaterial(
    searchParams.get("material") || "All"
  );
  
  setSelectedCrocsType(
    searchParams.get("crocs_type") || "All"
  );
  
  setSelectedSliderType(
    searchParams.get("slider_type") || "All"
  );
  
  setSelectedSandalType(
    searchParams.get("sandal_type") || "All"
  );
  
  setSelectedAccessoryType(
    searchParams.get("accessory_type") || "All"
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
    // console.log(
    //   data.filter(p => p.brand === "Crocs")
    // );
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


  function shuffleArray(array) {
    const shuffled = [...array];
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
  
      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }
  
    return shuffled;
  }
    

  function filterProducts() {

    let result = [...products];

    if (selectedCategory !== "All") {

      result = result.filter(product => {
    
        if (selectedCategory === "Crocs") {
          return product.brand === "Crocs";
        }
    
        return product.category === selectedCategory;
    
      });
    
    }
    // console.log(
    //   result.map(p => ({
    //     name: p.name,
    //     brand: p.brand,
    //     category: p.category,
    //     subcategory: p.subcategory
    //   }))
    // );

    if (selectedBestFor !== "All") {

      result = result.filter(
        (product) =>
          product.specifications?.best_for?.includes(
            selectedBestFor
          )
      );
    
    }

    if (selectedMovement !== "All") {

      result = result.filter(
        product =>
          product.specifications?.movement ===
          selectedMovement
      );
    
    }
    
    if (selectedDisplayType !== "All") {
    
      result = result.filter(
        product =>
          product.specifications?.display_type ===
          selectedDisplayType
      );
    
    }
    
    if (selectedMaterial !== "All") {
    
      result = result.filter(
        product =>
          (selectedMaterial === "Metal"
            ? product.specifications?.material === "Stainless Steel"
            : product.specifications?.material === selectedMaterial)
      );
    
    }
    
    if (selectedCrocsType !== "All") {

      result = result.filter(
        product =>
          product.category === selectedCrocsType
      );
    
    }
    
    if (selectedSliderType !== "All") {

      result = result.filter(
        product =>
          product.category === selectedSliderType
      );
    
    }
    
    if (selectedSandalType !== "All") {

      result = result.filter(
        product =>
          product.category === selectedSandalType
      );
    
    }
    
    if (selectedAccessoryType !== "All") {

      result = result.filter(
        product =>
          product.category === selectedAccessoryType
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

      result = result.filter(product =>
        product.colors?.some(
          color => color.color === selectedColor
        )
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

//     console.log("Selected Category:", selectedCategory);
// console.log("Selected Crocs Type:", selectedCrocsType);

// console.log(
//   result.map(p => ({
//     name: p.product_name || p.name,
//     category: p.category,
//     brand: p.brand,
//     subcategory: p.subcategory,
//     specifications: p.specifications,
//   }))
// );

    setFilteredProducts(result);
  }

   if (sortBy === "popular") {
      filteredProducts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }


    const displayedProductCount = filteredProducts.reduce(
      (total, product) => {
          if (product.colors?.length) {
              return total + product.colors.length;
          }
  
          return total + 1;
      },
      0
  );




  const displayProducts = useMemo(() => {

    const flattened = filteredProducts.flatMap((product) => {
  
      if (!product.colors || product.colors.length === 0) {
        return [
          {
            product,
            displayColor: null,
            key: product.id,
          },
        ];
      }
  
      return product.colors.map((color, index) => ({
        product,
        displayColor: color,
        key: `${product.id}-${color.color}-${index}`,
      }));
  
    });
  
    // Randomize only for the default "newest" view
    if (sortBy === "newest") {
      return shuffleArray(flattened);
    }
  
    return flattened;
  
  }, [filteredProducts, sortBy]);

  

  return (
    <>
    <div className="products-banner">
  🚚 FREE DELIVERY ON ORDERS ABOVE ₹2000
</div>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
      />

{/* <DeliveryBanner

selectedAddress={selectedAddress}

onOpen={() => setShowAddressSheet(true)}

/> */}


      <section className="section">

      <ProductHeader
    pageTitle={pageTitle}
      />

<ActiveFilters

selectedGender={selectedGender}
selectedCategory={selectedCategory}
selectedBestFor={selectedBestFor}

setSelectedGender={setSelectedGender}
setSelectedCategory={setSelectedCategory}
setSelectedBestFor={setSelectedBestFor}

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
brands={brands}
activities={activities}
strapTypes={strapTypes}

selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}

selectedBestFor={selectedBestFor}
setSelectedBestFor={setSelectedBestFor}

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
        Showing {displayedProductCount} Products
          </p>

          {filteredProducts.length === 0 && (

<div className="coming-soon">

    <h2>
        🚧 Coming Soon
    </h2>

    <p>
        We're adding products to this collection.
        Stay tuned!
    </p>

    <button
        className="explore-products-btn"
        onClick={() => {

            navigate("/products");

        }}
    >
        Explore Other Products
    </button>

</div>

)}

          <div
            className={
              gridView === "2"
                ? "category-products-grid"
                : "category-products-grid-3"
            }
          >

{shuffleArray(
  filteredProducts.flatMap((product) => {

    if (!product.colors || product.colors.length === 0) {
      return [
        {
          product,
          displayColor: null,
          key: product.id,
        },
      ];
    }

    return product.colors.map((color, index) => ({
      product,
      displayColor: color,
      key: `${product.id}-${color.color}-${index}`,
    }));

  })
).map(({ product, displayColor, key }) => (

  <ProductCard
    key={key}
    product={product}
    {...(displayColor
      ? { displayColor }
      : {})}
  />

))}
           </div>

          {filteredProducts.length === 0 && (
<>

  <h2 className="related-title">
    You May also Like
  </h2>

  <div className="related-products-grid">

  {relatedProducts.map((product) => (

<ProductCard
    key={product.id}
    product={product}
/>

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

      {/* <AddressSheet

    open={showAddressSheet}

    onClose={() => setShowAddressSheet(false)}

/> */}
    </>
  );
}

export default AllProductsPage;