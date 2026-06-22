import whatsapp from "../assets/brands/whatsapp.png";
import insta from "../assets/brands/Insta.png";
import gmail from "../assets/brands/Gmail.png";

function Contact() {
    return (
        <section className="contact-section">
        <div className="contact-left">
          <h2>Contact Us</h2>
      
          <p>📞 +91 7868905884</p>
          <p>﹫ 555shoesindia@gmail.com</p>
          <p>📍Garage no.19 <br />28th Cross Street <br /> Besant Nagar <br />Chennai-90</p>
          <p>🕒 Open Daily:11 AM - 10 PM</p>
      
         
        </div>

        <div className="social-section">

  <h3>Connect With Us</h3>

  <div className="social-icons">

    <a
      href="https://www.instagram.com/555_shoes_online"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={insta}
        alt="Instagram"
      />
    </a>

    <a
      href="https://wa.me/917868905884"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={whatsapp}
        alt="WhatsApp"
      />
    </a>

    <a
      href="mailto:555shoesindia@gmail.com"
    >
      <img
        src={gmail}
        alt="Gmail"
      />
    </a>

  </div>

</div>
      
        <div className="contact-right">
          <iframe
            title="555 Shoes Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5524890068677!2d80.26728847588005!3d13.000449814243474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b91c1b1adb%3A0x8f09138cfc6dfb2e!2s555%20Shoes!5e0!3m2!1sen!2sin!4v1780142628710!5m2!1sen!2sin" 
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
    );
  }
  export default Contact;