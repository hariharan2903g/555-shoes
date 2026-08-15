import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import puma from "../assets/brands/puma.png";
import crocs from "../assets/brands/crocs.png";
import casio from "../assets/brands/casio.png";
import under_armour from "../assets/brands/under armour.png";
import brooks from"../assets/brands/brooks.png";
import asics from "../assets/brands/asics.png";
import hoka from "../assets/brands/hoka.png";
import skechers from "../assets/brands/skechers.png";
import converse from "../assets/brands/converse.png";
import onitsuka from "../assets/brands/onitsuka.png";
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
    { name: "ASICS", logo: asics },
    { name: "HOKA", logo: hoka },
    { name: "Skechers", logo: skechers },
    { name: "Converse", logo: converse },
    { name: "Onitsuka Tiger", logo: onitsuka },
  ];

  return (
    <section className="section brands-section">
      <h2 className="brand-header">Shop By Brands</h2>

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