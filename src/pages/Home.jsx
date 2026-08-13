import shoes from "../assets/shoe image.webp";
import Crocs from "../assets/crocs image.jpg";
import slides from "../assets/slider image.webp"
import flipflop from "../assets/flipflop image.jpg";
import casio from "../assets/casiowatch.avif";
import "../App.css";

import Header from "../components/Header";
import DiscountBanner from "../components/DiscountBanner";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Whychooseus from "../components/Whychooseus";
import Footer from "../components/Footer";
import NewArrivals from "../components/NewArrivals";
import ProductModal from "../components/ProductModal";
import FeaturedProducts from "../components/TrendingProducts";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import accessoriesImage from "../assets/accessories.avif";
import Brands from "../components/Brands";
import BottomNav from "../components/BottomNav";
import HomeCategories from "../components/HomeCategories";
// import DeliveryBanner from "../components/DeliveryBanner";
// import AddressSheet from "../pages/AddressPage";

function Home({ setCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(
        "homeScroll",
        window.scrollY
      );
    };
  
    window.addEventListener(
      "scroll",
      saveScroll
    );
  
    return () =>
      window.removeEventListener(
        "scroll",
        saveScroll
      );
  }, []);


  async function fetchHomeBanners() {

    const { data, error } = await supabase
      .from("home_banners")
      .select("*")
      .eq("active", true)
      .order("display_order");
  
    if (!error) {
      setBanners(data);
    }
  
  }

  // const categories = [
  //   {
  //     name: "Shoes",
  //     image: shoes,
  //     startingPrice: "Starting From ₹999",
  //   },
  //   {
  //     name: "Crocs",
  //     image: Crocs,
  //     startingPrice: "Starting From ₹799",
  //   },
  //   {
  //     name: "Watches",
  //     image: casio,
  //     startingPrice: "Starting From ₹499",
  //   },
  //   {
  //     name: "Sliders",
  //     image: slides,
  //     startingPrice: "Starting From ₹399",
  //   },
  //   {
  //     name: "Flip-Flops",
  //     image: flipflop,
  //     startingPrice: "Starting From ₹299",
  //   },
  //   {
  //     name: "Accessories",
  //     image: accessoriesImage,
  //     startingPrice: "Starting From ₹299",
  //   },
  // ];

  useEffect(() => {
    fetchProducts();
    fetchNewArrivals();
    fetchTrendingProducts();
  }, []);
  
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");
  
    if (error) {
      console.error(error);
    } else {
     setProducts(data);

const savedPosition =
  sessionStorage.getItem("homeScroll");

if (savedPosition) {
  setTimeout(() => {
    window.scrollTo(
      0,
      parseInt(savedPosition)
    );
  }, 100);
}
// console.log(data);
    }
  }

 

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
    // console.log(data[0]);
  }

  async function fetchTrendingProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .limit(12);
  
    if (error) {
      console.error(error);
    } else {
      setTrendingProducts(data);
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
    <div className="home-page">

<Header
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  scrolled={scrolled}
  setCartOpen={setCartOpen}
/>

<HomeCategories />

<Banner/>

<Hero banners={banners} />

<NewArrivals
  newArrivals={newArrivals}
  
/>

<DiscountBanner />

{/* <Categories categories={categories} /> */}

<Brands />

<FeaturedProducts
    trendingProducts={trendingProducts}
   
/>

<BottomNav
  setMenuOpen={setMenuOpen}
  setCartOpen={setCartOpen}
/>

<Whychooseus />



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

//   <AddressSheet

//     open={showAddressSheet}

//     onClose={() => setShowAddressSheet(false)}

// />
  

}

export default Home;