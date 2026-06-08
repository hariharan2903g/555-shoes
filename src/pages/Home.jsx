import logo from "../assets/555logo.png";
import shoes from "../assets/shoe image.webp";
import Crocs from "../assets/crocs image.jpg";
import slides from "../assets/slider image.webp"
import flipflop from "../assets/flipflop image.jpg";
import airmax from "../assets/airmax image.jpeg";
import crocsclassic from "../assets/crocsclassic.jpg";
import casio from "../assets/casiowatch.avif";
import "../App.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Contact from "../components/Contact";
import Whychooseus from "../components/Whychooseus";
import Footer from "../components/Footer";
import NewArrivals from "../components/NewArrivals";
import ProductModal from "../components/ProductModal";
import FeaturedProducts from "../components/FeaturedProducts";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      name: "Shoes",
      image: shoes,
      startingPrice: "Starting From ₹999",
    },
    {
      name: "Crocs",
      image: Crocs,
      startingPrice: "Starting From ₹799",
    },
    {
      name: "Watches",
      image: casio,
      startingPrice: "Starting From ₹499",
    },
    {
      name: "Sliders",
      image: slides,
      startingPrice: "Starting From ₹399",
    },
    {
      name: "Flip-Flops",
      image: flipflop,
      startingPrice: "Starting From ₹299",
    },
  ];

  useEffect(() => {
    fetchProducts();
    fetchNewArrivals();
  }, []);
  
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");
  
    if (error) {
      console.error(error);
    } else {
      setProducts(data);
      console.log(data);
    }
  }
  
  // newArrivals fetching

  async function fetchNewArrivals() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
  
    if (error) {
      console.error(error);
    } else {
      setNewArrivals(data);
    }
  }

  const [selectedCategory, setSelectedCategory] = useState("All");
 
  const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) => product.category === selectedCategory
      );

  return (
    <div>

<Header
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  scrolled={scrolled}
/>

<Hero />

<NewArrivals
  newArrivals={newArrivals}
  setSelectedProduct={setSelectedProduct}
/>

<FeaturedProducts
  products={filteredProducts}
  setSelectedProduct={setSelectedProduct}
/>

<Categories categories={categories} />

<Whychooseus />

<Contact/>

<Footer />

{selectedProduct && (
  <ProductModal
    product={selectedProduct}
    setSelectedProduct={
      setSelectedProduct
    }
  />
)}
    </div>
    
    
  );
  

}

export default Home;