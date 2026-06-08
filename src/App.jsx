import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/category/:category"
        element={<CategoryPage />}
      />

      <Route
        path="/product/:id"
        element={<ProductPage />}
      />
    </Routes>
  );
}

export default App;