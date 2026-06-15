import banner1 from "../assets/Banner1.jpg";
import banner2 from "../assets/Banner2.webp";
import banner3 from "../assets/Banner3.avif";
import banner4 from "../assets/Banner4.jpg";
import {FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import { useState, useEffect } from "react";

function Banner() {
  const banners = [
    banner1,
    banner2,
    banner3,
    banner4,
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
  
      {banners.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="banner"
          className={
            index === current
              ? "active"
              : ""
          }
        />
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