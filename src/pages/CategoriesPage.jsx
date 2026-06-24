import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";import logo from "../assets/555logo.png";
import runningShoes from "../assets/categories/Runningshoes.webp";
import casualShoes from "../assets/categories/Casualshoes.webp";
import formalShoes from "../assets/categories/FormalShoes.jpg";
import partyWearShoes from "../assets/categories/Partywearshoes.webp";

import crocsClogs from "../assets/categories/Crocsclogs.jpeg";
import crocsFlipFlops from "../assets/categories/Crocsflipflop.webp";
import crocsSliders from "../assets/categories/Crocssliders.webp";

import casualSliders from "../assets/categories/Casualsliders.webp";

import sportSandals from "../assets/categories/Sportsandals.webp";
import formalSandals from "../assets/categories/Formalsandals.webp";

import digitalWatch from "../assets/categories/Digitalwatch.jpg";
import automaticWatch from "../assets/categories/Automaticwatch.avif";
import chronographWatch from "../assets/categories/Chronographwatch.webp";
import leatherWatch from "../assets/categories/Leatherstrapwatch.webp";
import metalWatch from "../assets/categories/Metalstrapwatch.webp";
import socks from "../assets/categories/Socks.jpg";
import capImage from "../assets/categories/cap.webp";
import beltImage from "../assets/categories/belts.avif";
import walletImage from "../assets/categories/Wallets.avif";
import sideBagImage from "../assets/categories/Sidebags.jpeg";
import glassesImage from "../assets/categories/glasses.webp";
import keychainImage from "../assets/categories/keychain.jpg";

function CategoriesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    console.log(data);
  }
  console.log(products);

  const visibleSubcategories = [
    ...new Set(
      products
        .filter(
          (p) =>
            (
                selectedGender === "All"
                  ? true
                  : selectedGender === "Men"
                  ? p.gender === "Men" || p.gender === "Unisex"
                  : selectedGender === "Women"
                  ? p.gender === "Women" || p.gender === "Unisex"
                  : p.gender === "Unisex"
              )
            &&
            (
              !selectedCategory ||
              p.category === selectedCategory
            )
        )
        .map((p) => p.subcategory)
        .filter(Boolean)
    ),
  ];


  const categoryImages = {
    "Running Shoes": runningShoes,
    "Casual Shoes": casualShoes,
    "Sport Shoes": runningShoes,
    "Formal Shoes": formalShoes,
    "Party Wear Shoes": partyWearShoes,
  
    "Crocs Clogs": crocsClogs,
    "Crocs Flip-Flops": crocsFlipFlops,
    "Crocs Sliders": crocsSliders,
  
    "Casual Sliders": casualSliders,
  
    "Sports Sandals": sportSandals,
    "Formal Sandals": formalSandals,
  
    "Digital Watch": digitalWatch,
    "Automatic Watch": automaticWatch,
    "Chronograph Watch": chronographWatch,
    "Leather Strap": leatherWatch,
    "Metal Strap": metalWatch,
    "Silicon Strap": digitalWatch, // temp image
  
    "Cap": capImage,
    "Belts": beltImage,
    "Wallets": walletImage,
    "Side Bags": sideBagImage,
    "Glasses": glassesImage,
    "Keychain": keychainImage,
    "Socks": socks,
  };

  const availableCategories = [
    ...new Set(
      products
        .filter((p) => {
          if (selectedGender === "All") return true;
  
          if (selectedGender === "Men") {
            return p.gender === "Men" || p.gender === "Unisex";
          }
  
          if (selectedGender === "Women") {
            return p.gender === "Women" || p.gender === "Unisex";
          }
  
          if (selectedGender === "Unisex") {
            return p.gender === "Unisex";
          }
  
          return false;
        })
        .map((p) => p.category)
        .filter(Boolean)
    ),
  ];
  console.log(availableCategories);
  
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
    setSelectedCategory(null);
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
    setSelectedCategory(null);
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
    setSelectedCategory(null);
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
    setSelectedCategory(null);
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
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category
                        ? null
                        : category
                    )
                  }
            >
                {category}
            </button>
            )
        )}

        </div>

      

        <h2 className="categories-title">
        {selectedCategory || "Categories"}
        </h2>

      

      <div className="categories-grid">

      {visibleSubcategories.map((item) => (
          <div
            key={item}
            className="category-card"
            onClick={() => {

                const productForSubcategory =
                  products.find(
                    (p) => p.subcategory === item
                  );
              
                navigate(
                  `/products?gender=${selectedGender}&category=${
                    productForSubcategory?.category
                  }&subcategory=${item}`
                );
              
              }}
          >
            <>
            <img
                src={categoryImages[item]}
                alt={item}
            />

            <h3>{item}</h3>
            </>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CategoriesPage;