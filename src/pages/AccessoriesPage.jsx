import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AccessoriesPage({setCartOpen}) {
  const navigate = useNavigate();

  return (
    <section className="coming-soon-page">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
        />
      <h1>Accessories</h1>

      <p>
    ⚙️ 🛠️  We're preparing a collection of
premium bags, caps and belts. 🛠️ ⚙️

Coming Soon. . . .
      </p>

      <button
        onClick={() => navigate("/products")}
      >
        Explore Other Products
      </button>
      <Footer />
    </section>
  );
}

export default AccessoriesPage;