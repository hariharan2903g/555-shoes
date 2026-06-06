import logo from "../assets/555logo.png";


function Header({
    menuOpen,
    setMenuOpen,
    scrolled,
  }) {
    return (
      <header
        className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-container">
          <img
            src={logo}
            alt="555 Shoes Logo"
            className="logo"
          />
  
          <h1 className={scrolled ? "hide-title" : ""}>
            555 SHOES
          </h1>
        </div>
  
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
  
        <nav
          className={`navbar ${
            menuOpen ? "active" : ""
          }`}
        >
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Watches</a>
          <a href="#">Sale</a>
          <a href="#">Help</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    );
  }
  
  export default Header;