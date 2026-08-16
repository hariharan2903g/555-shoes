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
import Stock from "./admin/pages/Stock/Stock";
import OrdersPage from "./pages/OrdersPage";
import EditProducts from "./admin/pages/EditProducts/EditProducts";
import EditProduct from "./admin/pages/EditProducts/EditProduct";

import MobileOnlyGuard from "./components/MobileOnlyGuard";

function CustomerRoute({ children }) {
  return (
    <MobileOnlyGuard>
      {children}
    </MobileOnlyGuard>
  );
}

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
        <CustomerRoute>
        <Home
          setCartOpen={setCartOpen}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        </CustomerRoute>
      }
    />

      <Route
        path="/search"
        element={<CustomerRoute><SearchPage /></CustomerRoute>}
      />

      <Route
        path="/wishlist"
        element={
           <CustomerRoute>
          <WishlistPage
            setCartOpen={setCartOpen}
          />
          </CustomerRoute>
        }
      />

<Route
  path="/product/:id"
  element={ 
  <CustomerRoute>
    <ProductPage
      setCartOpen={setCartOpen}
      setHideBottomNav={setHideBottomNav}
    />
    </CustomerRoute>
  }
/>


        <Route
          path="/checkout"
          element={ <CustomerRoute>
            <CheckoutPage />
            </CustomerRoute>
          }
        />

          <Route
            path="/categories"
            element={<CustomerRoute> 
              <CategoriesPage />
              </CustomerRoute>
            }
          />

      <Route
        path="/products"
        element={ <CustomerRoute>
          <AllProductsPage setCartOpen={setCartOpen}/>
        </CustomerRoute>}
      />

{/* Admin */}

{import.meta.env.DEV && (
  <>
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
      path="/admin/edit-products"
      element={<EditProducts />}
    />

    <Route
      path="/admin/edit-product/:id"
      element={<EditProduct />}
    />

    <Route
      path="/admin/stock"
      element={<Stock />}
    />
  </>
)}


<Route
    path="/customer-care"
    element={ <CustomerRoute>
    <CustomerCarePage />
      </CustomerRoute>
    }
/>

<Route
  path="/orders"
  element={
    <CustomerRoute>
      <OrdersPage />
    </CustomerRoute>
  }
/>

    <Route
  path="/address"
  element={<CustomerRoute>
    <AddressPage />
    </CustomerRoute>
  }
  />
  <Route
    path="/add-address"
    element={ <CustomerRoute>
        <AddAddressPage
            setCartOpen={setCartOpen}
            returnToCart={returnToCart}
            setReturnToCart={setReturnToCart}
        />
        </CustomerRoute>
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