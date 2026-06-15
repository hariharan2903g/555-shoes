import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import AllProductsPage from "./pages/AllProductsPage";
import BrandPage from "./pages/BrandPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/category/accessories"
        element={<AccessoriesPage />}
      />

      <Route
        path="/category/:category"
        element={<CategoryPage />}
      />

      <Route
        path="/product/:id"
        element={<ProductPage />}
      />
      <Route
        path="/brand/:brand"
        element={<BrandPage />}
      />

      <Route
        path="/products"
        element={<AllProductsPage />}
      />
    </Routes>
  );
}

export default App;