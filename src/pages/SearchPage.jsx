import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function SearchPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const trendingSearches = ["Shoes", "Slides", "Crocs","Sneakers","Watches",];

  useEffect(() => {
    fetchProducts();

    const viewed =
      JSON.parse(
        localStorage.getItem(
          "recentlyViewed"
        )
      ) || [];

    setRecentProducts(
      viewed.slice(0, 6)
    );
  }, []);

  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  const filteredProducts =
  products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      product.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      product.brand
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

        
  );
  const suggestions = [
    ...new Set(
      filteredProducts.map(
        (product) => product.name
      )
    ),
  ].slice(0, 5);

  return (
    <div className="search-page">

      <div className="search-header">

        <button
          className="search-back"
          onClick={() => navigate(-1)}
        >
          ⏎
        </button>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <FiSearch />

        </div>

      </div>

      {search ? (
  <>
    <h2>Suggestions</h2>

    <div className="search-suggestions">

      {suggestions.map(
        (item) => (

          <p
            key={item}
            className="suggestion-item"
            onClick={() =>
              setSearch(item)
            }
          >
            {item}
          </p>

        )
      )}

    </div>

    <h2>
      Related Products
    </h2>

    <div className="search-results">

            {filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="search-product"
                  onClick={() =>
                    navigate(
                      `/product/${product.id}`
                    )
                  }
                >

                  <img
                    src={
                      product.image_url
                    }
                    alt={
                      product.name
                    }
                  />

                  <div>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      ₹{product.price}
                    </p>

                  </div>

                </div>
            
              )
            )}
            {filteredProducts.length === 0 && (
  <p className="no-results">
    No products found
  </p>
)}
          </div>
        </>
     ) : (
        <>
          <h2>
            Trending Searches
          </h2>
      
          <div className="trending-searches">
      
            {trendingSearches.map(
              (item) => (
      
                <p
                  key={item}
                  className="trending-item"
                  onClick={() =>
                    setSearch(item)
                  }
                >
                  {item}
                </p>
      
              )
            )}
      
          </div>
      
          <h2>
            Recently Viewed
          </h2>


          <div className="search-results">

            {recentProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="search-product"
                  onClick={() =>
                    navigate(
                      `/product/${product.id}`
                    )
                  }
                >

                  <img
                    src={
                      product.image_url
                    }
                    alt={
                      product.name
                    }
                  />

                  <div>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      ₹{product.price}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>
        </>
      )}

    </div>
  );
}

export default SearchPage;