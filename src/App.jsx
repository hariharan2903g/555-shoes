import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import AllProductsPage from "./pages/AllProductsPage";
import BrandPage from "./pages/BrandPage";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [cartOpen, setCartOpen] =useState(false);
  return (
    
    <>
    <CartDrawer
      cartOpen={cartOpen}
      setCartOpen={setCartOpen}
    />
    <Routes>
      <Route
        path="/"
        element={<Home setCartOpen={setCartOpen}/>}
      />

      <Route
        path="/category/accessories"
        element={<AccessoriesPage />}
      />

      <Route
        path="/category/:category"
        element={
          <CategoryPage
            setCartOpen={setCartOpen}
          />
        }
      />

      <Route
        path="/product/:id"
        element={ <ProductPage setCartOpen={setCartOpen}/>}
      />
          <Route
      path="/brand/:brand"
      element={
        <BrandPage
          setCartOpen={setCartOpen}
        />
      }
    />

      <Route
        path="/products"
        element={<AllProductsPage setCartOpen={setCartOpen}/>}
      />
    </Routes>
    </>
  );
}

export default App;