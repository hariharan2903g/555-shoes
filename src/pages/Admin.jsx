import "../admin/styles/Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Skooks Admin</h1>
      <p className="admin-subtitle">
        Manage your store from one place.
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>📦 Products</h2>
          <button onClick={() => navigate("/admin/add-product")}> Add Product </button>
          <button onClick={() => navigate("/admin/view-products")}> View Products </button>
          <button>Edit Product</button>
        </div>

        <div className="dashboard-card">
          <h2>🏷️ Offers & Discounts</h2>
          <button>Offer Banner</button>
          <button>Sale Announcement</button>
          <button>Coupon Codes</button>
        </div>

        <div className="dashboard-card">
          <h2>🏪 Store Management</h2>
          <button>Brands</button>
          <button>Categories</button>
          <button>Sizes</button>
          <button>Colors</button>
        </div>

        <div className="dashboard-card">
          <h2>📊 Inventory</h2>
          <button
            onClick={() => navigate("/admin/stock")}
          >
            Stock
          </button>
          <button>Out of Stock</button>
        </div>

      </div>
    </div>
  );
}

export default Admin;