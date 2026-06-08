import { useNavigate } from "react-router-dom";
function Categories({ categories }) {
  const navigate = useNavigate();
    return (
        <section className="section">
            <h2>Categories</h2>
          
            <div className="category-grid">
              {categories.map((category) => (
                <div
                key={category.name}
                className="category-card"
                onClick={() =>
                  navigate(
                    `/category/${category.name.toLowerCase()}`
                  )
                }
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                  <div className="overlay">{category.name}</div>
                </div>
              ))}
            </div>
          </section>
    );
  }
  
  export default Categories;