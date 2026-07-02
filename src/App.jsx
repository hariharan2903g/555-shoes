import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AllProductsPage from "./pages/AllProductsPage";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import CategoriesPage from "./pages/CategoriesPage";
import AddressPage from "./pages/AddressPage";
import AddAddressPage from "./pages/AddAddressPage";

function App() {
  const [cartOpen, setCartOpen] =useState(false);
  const location = useLocation();
  const hideBottomNav =
  location.pathname === "/checkout" ||
  location.pathname === "/address"  ||
  location.pathname === "/add-address";
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    
    <>
    <CartDrawer
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
    />
    <Routes>
     

    <Route
      path="/"
      element={
        <Home
          setCartOpen={setCartOpen}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      }
    />

      <Route
        path="/search"
        element={<SearchPage />}
      />

      <Route
        path="/wishlist"
        element={
          <WishlistPage
            setCartOpen={setCartOpen}
          />
        }
      />

      <Route
        path="/product/:id"
        element={ <ProductPage setCartOpen={setCartOpen}/>}
      />


        <Route
          path="/checkout"
          element={
            <CheckoutPage />
          }
        />

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />

      <Route
        path="/products"
        element={<AllProductsPage setCartOpen={setCartOpen}/>}
      />
   

    <Route
  path="/address"
  element={<AddressPage />}
  />
  <Route
    path="/add-address"
    element={<AddAddressPage />}
/>
   </Routes>

   
    
        {!hideBottomNav && (
      <BottomNav
        setCartOpen={setCartOpen}
        setMenuOpen={setMenuOpen}
      />

      
       )}
    
    </>
  );
}


export default App;