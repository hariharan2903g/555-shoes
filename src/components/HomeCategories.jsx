import { useNavigate } from "react-router-dom";

import shoes from "../assets/shoe image.webp";
import crocs from "../assets/crocs image.jpg";
import watches from "../assets/casiowatch.avif";
import sliders from "../assets/slider image.webp";
import sandals from "../assets/categories/Sportsandals.webp";
import accessories from "../assets/accessories.avif";

import "./HomeCategories.css";

function HomeCategories() {

  const navigate = useNavigate();

  const categories = [
    {
      name: "Shoes",
      image: shoes,
    },
    {
      name: "Crocs",
      image: crocs,
    },
    {
      name: "Watches",
      image: watches,
    },
    {
      name: "Sliders",
      image: sliders,
    },
    {
      name: "Sandals",
      image: sandals,
    },
    {
      name: "Accessories",
      image: accessories,
    },
  ];

  return (

    <div className="home-categories">

      {categories.map((category) => (

        <div
          key={category.name}
          className="home-category-card"
          onClick={() =>
            navigate(
              `/products?category=${category.name}`
            )
          }
        >

          <img
            src={category.image}
            alt={category.name}
            className="home-category-image"
          />

          <p>{category.name}</p>

        </div>

      ))}

    </div>

  );

}

export default HomeCategories;