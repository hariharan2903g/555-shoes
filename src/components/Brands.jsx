import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import puma from "../assets/brands/puma.png";
import crocs from "../assets/brands/crocs.png";
import casio from "../assets/brands/casio.png";
import under_armour from "../assets/brands/under armour.png";
import brooks from"../assets/brands/brooks.png";
import { useNavigate } from "react-router-dom";
import { saveScrollAndNavigate }from "../utils/navigation";


function Brands() {
  const navigate = useNavigate();
  const brands = [
    { name: "Nike", logo: nike },
    { name: "Adidas", logo: adidas },
    { name: "Puma", logo: puma },
    { name: "Crocs", logo: crocs },
    { name: "Casio", logo: casio },
    { name: "under Armour", logo: under_armour },
    { name: "Brooks", logo: brooks },
  ];

  return (
    <section className="section">
      <h2>Shop By Brands</h2>

      <div className="brands-container">
        {brands.map((brand) => (
           <div
           key={brand.name}
           className="brand-card"
           onClick={() =>
            saveScrollAndNavigate(
              navigate,
              `/products?brand=${brand.name}`
            )
          }
         >
            <div className="brand-circle">
              <img
                src={brand.logo}
                alt={brand.name}
              />
            </div>

            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;