import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import logo from "../assets/555logo.png";
import { categoryImages } from "../data/categoryImages";
import { categories } from "../data/categories";
import "./CategoriesPage.css";

function CategoriesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Shoes");

  useEffect(() => {
    fetchProducts();
  }, []);
  
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");
  
    if (!error) {
      setProducts(data);
    }
    // console.log(data);
  }
 

  const availableCategories = Object.keys(categories);
 

  return (
    <div className="categories-page">

      <div className="categories-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="categories-hero">

            <img
            src={logo}
            alt="555 Shoes"
            className="categories-logo"
            />

            <h1>Explore Categories</h1>

            <p>
            Every Step Has A Story
            </p>

            </div>
      </div>

      <div
  className="categories-search-bar"
  onClick={() => navigate("/search")}
>
  🔍 Search products...
</div>

      <div className="gender-filters">

      <button
  className={`gender-pill ${
    selectedGender === "All"
      ? "active-pill"
      : ""
  }`}
  onClick={() => {
    setSelectedGender("All");
    setSelectedCategory("Shoes");
  }}
>
  All
</button>

<button
  className={`gender-pill ${
    selectedGender === "Men"
      ? "active-pill"
      : ""
  }`}
  onClick={() => {
    setSelectedGender("Men");
    setSelectedCategory("Shoes");
  }}
>
  Men
</button>

<button
  className={`gender-pill ${
    selectedGender === "Women"
      ? "active-pill"
      : ""
  }`}
  onClick={() => {
    setSelectedGender("Women");
    setSelectedCategory("Shoes");
  }}
>
  Women
</button>

<button
  className={`gender-pill ${
    selectedGender === "Unisex"
      ? "active-pill"
      : ""
  }`}
  onClick={() => {
    setSelectedGender("Unisex");
    setSelectedCategory("Shoes");
  }}
>
  Unisex
</button>
</div>

        <div className="category-pills">

        {/* className={`category-pill ${
        selectedCategory === category
            ? "active-pill"
            : ""
        }`} */}

        {availableCategories.map(
            (category) => (
            <button
                key={category}
                className={`category-pill ${
                    selectedCategory === category
                      ? "active-pill"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
            >
                {category}
            </button>
            )
        )}

        </div>

      

        <h2 className="categories-title">
        {selectedCategory || "Categories"}
        </h2>

      

        <div className="categories-page-grid">

      {(selectedCategory
    ? categories[selectedCategory]
    : Object.values(categories).flat()
).map((item) => (
          <div
            key={item}
            className="categories-page-card"
            onClick={() => {

              let url = `/products?gender=${selectedGender}&category=${selectedCategory}`;
            
              if (selectedCategory === "Shoes") {
            
                url += `&best_for=${item}`;
            
              }
            
              else if (selectedCategory === "Watches") {
            
                if (item === "Digital") {
                  url += `&display_type=Digital`;
                }
            
                else if (item === "Quartz") {
                  url += `&movement=Quartz`;
                }
            
                else if (item === "Automatic") {
                  url += `&movement=Automatic`;
                }
            
                else if (item === "Leather") {
                  url += `&material=Leather`;
                }
            
                else if (item === "Metal") {
                  url += `&material=Stainless Steel`;
                }
            
                else if (item === "Silicon") {
                  url += `&material=Silicon`;
                }
            
              }
            
              else if (selectedCategory === "Crocs") {
            
                url += `&crocs_type=${item}`;
            
              }
            
              else if (selectedCategory === "Sliders") {

                url = `/products?gender=${selectedGender}&category=${item}`;
              
              }
              
              else if (selectedCategory === "Sandals") {
              
                url = `/products?gender=${selectedGender}&category=${item}`;
              
              }
            
              else if (selectedCategory === "Accessories") {

                url = `/products?gender=${selectedGender}&category=${item}`;
              
              }
            
              navigate(url);
            
            }}
          >
            <>
            <img
                className="categories-page-image"
                src={categoryImages[selectedCategory]?.[item]}
                alt={item}
            />

            <h3 className="categories-page-name">{item}</h3>
            </>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CategoriesPage;