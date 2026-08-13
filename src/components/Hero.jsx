import sloganImage from "../assets/slogan.png";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
    
      <img
        src={sloganImage}
        alt="Every Step Has a Story"
        className="home-slogan-image"
      />
      </div>
    </section>
  );
}

export default Hero;