import logo from "./assets/555logo.png";
import shoes from "./assets/shoe image.webp";
import Crocs from "./assets/crocs image.jpg";
import slides from "./assets/slider image.webp"
import flipflop from "./assets/flipflop image.jpg";
import airmax from "./assets/airmax image.jpeg";
import crocsclassic from "./assets/crocsclassic.jpg";
import casio from "./assets/casiowatch.avif";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "₹3,999",
      category: "Shoes",
      image: airmax,
    },
    {
      id: 2,
      name: "Classic Crocs",
      price: "₹2,499",
      category: "Crocs",
      image: crocsclassic,
    },
    {
      id: 3,
      name: "Casio Watch",
      price: "₹1,999",
      category: "Watches",
      image: casio,
    },
  ];
  const newArrivals = [
    { id: 1, image: airmax },
    { id: 2, image: crocsclassic },
    { id: 3, image: casio },
    { id: 4, image: airmax },
    { id: 5, image: crocsclassic },
    { id: 6, image: casio },
    { id: 7, image: airmax },
    { id: 8, image: crocsclassic },
  ];

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

     <section className="section">
  <h2>🔥 New Arrivals</h2>

  <div className="arrival-slider">
    <div className="arrival-track">
      {newArrivals.map((item) => (
        <div className="arrival-card" key={item.id}>
          <img src={item.image} alt="New Arrival" />
        </div>
      ))}

      {newArrivals.map((item) => (
        <div className="arrival-card" key={`copy-${item.id}`}>
          <img src={item.image} alt="New Arrival" />
        </div>
      ))}
    </div>
  </div>
</section>

<Categories categories={categories} />


        <section className="section">
  <h2>Why Choose 555 Shoes</h2>

  <div className="features">
    <div className="feature-card">
      <h3>Premium Quality</h3>
      <p>Carefully selected footwear and accessories.</p>
    </div>

    <div className="feature-card">
      <h3>Latest Styles</h3>
      <p>Modern collections for every occasion.</p>
    </div>

    <div className="feature-card">
      <h3>Trusted Service</h3>
      <p>Helping customers step confidently every day.</p>
    </div>
  </div>
</section>


<section className="section">
        <h2>Featured Collections</h2>

        <div className="product-grid">
        {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <span>{product.category}</span>

                <button>View Product</button>
              </div>
            </div>
          ))}
        </div>
      </section>
<Contact/>

<Footer />
    </div>
    
  );
  

}

export default App;