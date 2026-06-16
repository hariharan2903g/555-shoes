import Header from "../components/Header";
import Footer from "../components/Footer";
function AllProductsPage({setCartOpen}) {
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


    return (
      <section className="section">
        <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        setCartOpen={setCartOpen}
        />


        <h1>All Products</h1>
        <Footer />
      </section>
    );
  }
  
  export default AllProductsPage;