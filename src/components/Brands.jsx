import { useEffect, useRef } from "react";
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

  const brandsContainerRef = useRef(null);

  const animationRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const directionRef = useRef("forward");
  const pauseUntilRef = useRef(0);



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

  useEffect(() => {

    const container = brandsContainerRef.current;

    if (!container) return;

    let lastTime = performance.now();

    const forwardSpeed = 45;
    const reverseSpeed = 800;

    const animate = (currentTime) => {

      const deltaTime =
        (currentTime - lastTime) / 1000;

      lastTime = currentTime;

      if (currentTime >= pauseUntilRef.current) {

        if (directionRef.current === "forward") {

          container.scrollLeft +=
            forwardSpeed * deltaTime;

          const reachedEnd =
            container.scrollLeft +
              container.clientWidth >=
            container.scrollWidth - 2;

          if (reachedEnd) {

            directionRef.current = "reverse";

            pauseUntilRef.current =
              currentTime + 1200;

          }

        }

        else if (
          directionRef.current === "reverse"
        ) {

          container.scrollLeft -=
            reverseSpeed * deltaTime;

          if (container.scrollLeft <= 0) {

            container.scrollLeft = 0;

            directionRef.current = "forward";

            pauseUntilRef.current =
              currentTime + 1200;

          }

        }

      }

      animationRef.current =
        requestAnimationFrame(animate);

    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {

      cancelAnimationFrame(
        animationRef.current
      );

    };

  }, []);

  const pauseAfterInteraction = () => {

    pauseUntilRef.current =
      performance.now() + 3000;

    if (pauseTimeoutRef.current) {

      clearTimeout(
        pauseTimeoutRef.current
      );

    }

    pauseTimeoutRef.current =
      setTimeout(() => {

        pauseUntilRef.current =
          performance.now();

      }, 3000);

  };


  return (
    <section className="section brands-section">
      <h2 className="brand-header">Shop By Brands</h2>

      <div
          className="brands-container"
          ref={brandsContainerRef}
          onTouchStart={pauseAfterInteraction}
          onPointerDown={pauseAfterInteraction}
          onWheel={pauseAfterInteraction}
        >


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