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
import Admin from "./pages/Admin";
import AddProduct from "./admin/AddProduct";
import { ToastContainer } from "react-toastify";
import ViewProducts from "./admin/pages/ViewProducts/ViewProducts";
import CustomerCarePage from "./pages/CustomerCarePage";
import ToastProvider from "./components/Toast/ToastProvider";

function App() {
  const [cartOpen, setCartOpen] =useState(false);
  const [returnToCart, setReturnToCart] = useState(false);
  const location = useLocation();
  const shouldHideBottomNav =
  location.pathname === "/checkout" ||
  location.pathname === "/address" ||
  location.pathname === "/add-address" ||
  location.pathname.startsWith("/admin");
  const [hideBottomNav, setHideBottomNav] = useState(false);
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
  element={
    <ProductPage
      setCartOpen={setCartOpen}
      setHideBottomNav={setHideBottomNav}
    />
  }
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

{/* Admin */}

<Route
  path="/admin"
  element={<Admin />}
/>

<Route
  path="/admin/add-product"
  element={<AddProduct />}
/>

<Route
  path="/admin/view-products"
  element={<ViewProducts />}
/>
<Route
    path="/customer-care"
    element={<CustomerCarePage />}
/>

    <Route
  path="/address"
  element={<AddressPage />}
  />
  <Route
    path="/add-address"
    element={
        <AddAddressPage
            setCartOpen={setCartOpen}
            returnToCart={returnToCart}
            setReturnToCart={setReturnToCart}
        />
    }
/>
   </Routes>

   
    
   {!shouldHideBottomNav && (
     <BottomNav
     setCartOpen={setCartOpen}
     setMenuOpen={setMenuOpen}
     hide={hideBottomNav}
 />

      
       )}

<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
/>

<ToastProvider />
    
    </>
  );
}


export default App;