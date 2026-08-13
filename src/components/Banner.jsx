import banner1 from "../assets/Banner1.png";
import banner2 from "../assets/Banner2.png";
import banner3 from "../assets/Banner3.png";
import banner4 from "../assets/Banner4.png";
import { Link } from "react-router-dom";
import {FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import { useState, useEffect } from "react";

function Banner() {
  const banners = [
    {
      image: banner1,
      link: "/product/43",
    },
    {
      image: banner2,
      link: "/products?brand=Crocs",
    },
    {
      image: banner3,
      link: "/products?brand=Casio",
    },
    {
      image: banner4,
      link: "/products?brand=Puma&category=Shoes",
    },
  ];

  const [current, setCurrent] = useState(0);
  
  function prevSlide() {
    setCurrent(
      current === 0
        ? banners.length - 1
        : current - 1
    );
  }
  
  function nextSlide() {
    setCurrent(
      (current + 1) % banners.length
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        (prev + 1) % banners.length
      );
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="banner">
  
  {banners.map((banner, index) => (
  <Link
    key={index}
    to={banner.link}
    className={index === current ? "banner-link active" : "banner-link"}
  >
    <img
      src={banner.image}
      alt="banner"
    />
  </Link>
))}
  
      <button
        className="banner-arrow left"
        onClick={prevSlide}
      >
       <FaChevronLeft />
      </button>
  
      <button
        className="banner-arrow right"
        onClick={nextSlide}
      >
       <FaChevronRight />
      </button>
  
      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={
              current === index
                ? "dot active-dot"
                : "dot"
            }
            onClick={() =>
              setCurrent(index)
            }
          />
        ))}
      </div>
  
    </section>
  );
}

export default Banner;