import logo from "./assets/555logo.png";
import shoes from "./assets/shoe image.webp";
import Crocs from "./assets/crocs image.jpg";
import slides from "./assets/slider image.webp"
import flipflop from "./assets/flipflop image.jpg";
import airmax from "./assets/airmax image.jpeg";
import crocsclassic from "./assets/crocsclassic.jpg";
import casio from "./assets/casiowatch.avif";
import "./App.css";

function App() {
  const categories = [
    {
      name: "Shoes",
      image: shoes,
    },
    {
      name: "Crocs",
      image:Crocs,
    },
    {
      name: "Watches",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    },
    {
      name: "Sliders",
      image: slides,
    },
    {
      name: "Flip-Flops",
      image: flipflop,
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

  return (
    <div>
     <header className="header">
  <div className="logo-container">
    <img src={logo} alt="555 Shoes Logo" className="logo" />
    <h1>555 SHOES</h1>
  </div>

  <nav className="navbar">
    <a href="#">Home</a>
    <a href="#">Categories</a>
    <a href="#">Products</a>
    <a href="#">Contact</a>
  </nav>
</header>

      <section className="hero">
        <div className="hero-content">
          <h2>EVERY STEP HAS A STORY</h2>
          <p>Premium Footwear & Accessories</p>
          <button>Browse Collection</button>
        </div>
      </section>

      <section className="section">
        <h2>Categories</h2>

        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            >
              <div className="overlay">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Featured Collections</h2>
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



        <div className="product-grid">
          {products.map((product) => (
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
{/* contact section */}

<section className="contact-section">
  <div className="contact-left">
    <h2>Contact 555 Shoes</h2>

    <p>📞 +91 7868905884</p>
    <p>﹫ 555shoesindia@gmail.com</p>
    <p>📍Garage no.19 <br />28th Cross Street <br /> Besant Nagar <br />Chennai-90</p>
    <p>🕒 Open Daily:11 AM - 10 PM</p>

    <button className="whatsapp-btn">
      WhatsApp Us 
    </button>
  </div>

  <div className="contact-right">
    <iframe
      title="555 Shoes Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5524890068677!2d80.26728847588005!3d13.000449814243474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b91c1b1adb%3A0x8f09138cfc6dfb2e!2s555%20Shoes!5e0!3m2!1sen!2sin!4v1780142628710!5m2!1sen!2sin" 
      width="100%"
      height="400"
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  </div>
</section>

{ /* footer */ }

<footer className="footer">
  <p>© 2026 555 Shoes</p>
  <p>Every Step Has A Story</p>
</footer>;

    </div>
    
  );
  

}

export default App;