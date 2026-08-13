import "./CustomerCarePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import whatsapp from "../assets/brands/whatsapp.png";
import phone from "../assets/brands/phone.png";


function CustomerCarePage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedSection, setSelectedSection] = useState(
        location.state?.section || "delivery"
    );


    useEffect(() => {

        const section =
            location.state?.section;
    
        if (!section) return;
    
        const element =
            document.getElementById(section);
    
        if (!element) return;
    
        setTimeout(() => {
    
            element.scrollIntoView({
    
                behavior:"smooth",
    
                block:"start"
    
            });
    
            element.classList.add("section-highlight");
    
            setTimeout(() => {
    
                element.classList.remove(
                    "section-highlight"
                );
    
            },2000);
    
        },200);
    
    },[location]);
    

    const faqs = [

        {
            question:"How long does delivery take?",
            answer:"Most orders are delivered within 3–7 business days after dispatch. Delivery timelines may vary depending on your location and courier availability. You'll receive tracking details once your order has been shipped."
        },
        
        {
            question:"Can I exchange my size?",
            answer:"Yes. Eligible products can be exchanged within 7 days if they are unused and returned in their original packaging with all tags attached."
        },
        
        {
            question:"Do you offer refunds?",
            answer:"We primarily offer replacements for eligible products. Refunds are only processed in exceptional situations where a replacement cannot be provided."
        },
        
        {
            question:"How can I track my order?",
            answer:"Once your order is dispatched, you'll receive tracking details through WhatsApp, SMS, or Email."
        
        },
        
        {
            question:"What payment methods are accepted?",
            answer:"We accept UPI, Debit Cards, Credit Cards and other secure payment methods available during checkout."
        
        },
        
        {
            question:"How can I contact SkookS?",
            answer:"You can reach us through WhatsApp, Phone, or Email during our business hours."
        
        }
        
        ];



    return (

        <div className="customer-care-page">

            <div className="customer-care-header">

                <button
                    className="customer-back-btn"
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>

                <h1>Customer Care</h1>


            </div>

            <section id="delivery" className="care-section">

            <h2>
                    <span className="section-emoji">🚚</span>
                    Delivery Information
                </h2>

                <h3 className="section-subtitle">
                    Everything about shipping and order tracking.
                </h3>

                <p>
                    At <strong>SkookS</strong>, we are committed to delivering
                    your order quickly, safely, and securely. Every order is
                    carefully inspected before dispatch to ensure you receive
                    products in excellent condition.
                </p>

                <h3>Order Processing</h3>

                <p>
                    Orders are usually processed within 24 hours after successful
                    payment confirmation. Orders placed on Sundays or public
                    holidays will be processed on the next working day.
                </p>

                <h3>Delivery Time</h3>

                <p>
                    Delivery timelines depend on your location. Most orders are
                    delivered within <strong>3–7 business days</strong>, while
                    remote locations may take a little longer.
                </p>

                <h3>Shipping Charges</h3>

                <p>
                    We offer <strong>Free Shipping</strong> on orders above
                    <strong> ₹2,500</strong>. Shipping charges, if applicable,
                    will be displayed during checkout before payment.
                </p>

                <h3>Order Tracking</h3>

                <p>
                    Once your order is dispatched, you will receive tracking
                    details through WhatsApp, SMS, or Email so you can monitor
                    your shipment in real time.
                </p>

                <h3>Delivery Delays</h3>

                <p>
                    While we strive to deliver every order on time, delays caused
                    by weather conditions, courier issues, or unforeseen
                    circumstances may occasionally occur. We appreciate your
                    patience in such situations.
                </p>

            </section>

            <section id="warranty" className="care-section">

            <h2>
  <span className="section-emoji">🛡️</span>

                Warranty</h2>

            <p>
                Products sold through <strong>SkookS</strong> are not covered
                under any manufacturer or seller warranty unless explicitly
                mentioned on the product page.
            </p>

            <h3>Quality Assurance</h3>

            <p>
                Every product is carefully inspected before it is packed and
                dispatched. We ensure that products meet our quality standards
                before they leave our store.
            </p>

            <h3>Damaged or Incorrect Products</h3>

            <p>
                If you receive a damaged, defective, or incorrect product,
                please contact us within <strong>7 days</strong> of delivery.
                Our team will review your request and provide a suitable
                replacement if it meets our replacement policy.
            </p>

            <h3>Normal Wear & Tear</h3>

            <p>
                Damage caused by regular usage, improper handling, accidental
                damage, water exposure, or misuse is not covered under any
                warranty or replacement policy.
            </p>

            <h3>Need Assistance?</h3>

            <p>
                If you have any questions regarding a product or require
                assistance after your purchase, feel free to contact our
                customer support team. We're always happy to help.
            </p>

        </section>

        <section id="return" className="care-section">

        <h2>
        <span className="section-emoji">🔄</span>
            Return & Replacement
        </h2>

        <p>
            At <strong>SkookS</strong>, customer satisfaction is our
            priority. If you receive a damaged, defective, or incorrect
            product, we're here to help.
        </p>

        <h3>Replacement Eligibility</h3>

        <p>
            You can request a replacement within
            <strong> 7 days </strong>
            from the date of delivery if the product is damaged,
            defective, or different from what you ordered.
        </p>

        <h3>Conditions for Replacement</h3>

        <p>
            The product must be unused, unworn, and returned in its
            original packaging along with all tags, accessories, and
            invoice. Products that show signs of use may not be eligible
            for replacement.
        </p>

        <h3>Items Not Eligible</h3>

        <p>
            Products damaged due to improper handling, normal wear and
            tear, accidental damage, water exposure, or misuse are not
            eligible for return or replacement.
        </p>

        <h3>How to Request a Replacement</h3>

        <p>
            Contact our customer support team through WhatsApp, phone,
            or email with your order details and clear photos of the
            product. Once your request is verified, we'll guide you
            through the replacement process.
        </p>

        <h3>Refunds</h3>

        <p>
            Currently, <strong>SkookS</strong> offers replacements
            instead of refunds for eligible products. Refunds will only
            be processed in exceptional situations where a replacement
            cannot be provided.
        </p>

        </section>

        <section id="privacy" className="care-section">

        <h2>
        <span className="section-emoji">🔒</span>
            Privacy Policy
        </h2>

        <p>
            At <strong>SkookS</strong>, we value your privacy and are
            committed to protecting your personal information. This policy
            explains how we collect, use, and safeguard the information you
            share with us while using our website.
        </p>

        <h3>Information We Collect</h3>

        <p>
            We may collect your name, phone number, email address, delivery
            address, and other information required to process your orders.
            Payment information is securely processed through trusted payment
            partners and is not stored on our servers.
        </p>

        <h3>How We Use Your Information</h3>

        <p>
            Your information is used to process orders, deliver products,
            provide customer support, send order updates, and improve our
            services. We may also contact you regarding your purchases or
            important service updates.
        </p>

        <h3>Data Protection</h3>

        <p>
            We take reasonable security measures to protect your personal
            information against unauthorized access, misuse, or disclosure.
            While we strive to keep your information secure, no method of
            online transmission or storage is completely risk-free.
        </p>

        <h3>Third-Party Services</h3>

        <p>
            We may use trusted third-party service providers for payment
            processing, shipping, and website analytics. These providers only
            receive the information necessary to perform their services and
            are expected to handle your data responsibly.
        </p>

        <h3>Cookies</h3>

        <p>
            Our website may use cookies and similar technologies to improve
            your browsing experience, remember your preferences, and analyze
            website traffic. You can manage or disable cookies through your
            browser settings.
        </p>

        <h3>Your Rights</h3>

        <p>
            You may contact us at any time to update, correct, or request the
            deletion of your personal information, subject to applicable legal
            requirements and business obligations.
        </p>

        </section>

        <section id="terms" className="care-section">

        <h2>
        <span className="section-emoji">📜</span>
            Terms & Conditions
        </h2>

        <p>
            Welcome to <strong>SkookS</strong>. By accessing or using our
            website, you agree to comply with the following terms and
            conditions. Please read them carefully before placing an order.
        </p>

        <h3>Orders</h3>

        <p>
            All orders are subject to product availability and confirmation.
            We reserve the right to cancel or refuse any order in cases of
            pricing errors, suspected fraudulent activity, or unforeseen
            circumstances.
        </p>

        <h3>Pricing</h3>

        <p>
            We make every effort to ensure that product prices and
            descriptions are accurate. However, in rare cases where an error
            occurs, we reserve the right to correct the information or cancel
            the affected order before dispatch.
        </p>

        <h3>Product Availability</h3>

        <p>
            While we regularly update our inventory, some products may become
            unavailable after an order is placed. If this happens, we will
            inform you promptly and provide an appropriate solution.
        </p>

        <h3>Intellectual Property</h3>

        <p>
            All content on this website, including logos, product images,
            graphics, text, and designs, is the property of
            <strong> SkookS </strong>
            and may not be copied, reproduced, or used without prior written
            permission.
        </p>

        <h3>Limitation of Liability</h3>

        <p>
            SkookS shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our products or
            website, except where required by applicable law.
        </p>

        <h3>Changes to These Terms</h3>

        <p>
            We may update these Terms & Conditions from time to time to
            reflect changes in our services or legal requirements. Any
            updates will be published on this page and will become effective
            immediately upon posting.
        </p>

        </section>

        <section id="contact" className="care-section">

        <h2>
        <span className="section-emoji">📞</span>
            Contact Us
        </h2>

        <p>
            We're always happy to help! Whether you have a question about
            your order, need assistance with sizing, or want more
            information about our products, our team is here to assist you.
        </p>

        <h3>Store Address</h3>

        <p>
            <strong>SkookS</strong><br />
            Garage No. 19<br />
            28th Cross Street<br />
            Besant Nagar<br />
            Chennai - 600090<br />
            Tamil Nadu, India
        </p>

        <h3>Business Hours</h3>

        <p>
            Monday – Sunday<br />
            11:00 AM – 10:00 PM
        </p>

        <h3>Phone</h3>

        <p>
            <a href="tel:+917868905884" className="contact-call">
            <img className="call" src={phone} alt="Call" />
            <span>+91 7868905884</span>
                
            </a>
        </p>

        <h3>WhatsApp</h3>

        <p>
            <a
                href="https://wa.me/917868905884"
                target="_blank"
                rel="noreferrer"
                className="contact-call"
            >
                <img className="call" src={whatsapp} alt="WhatsApp" />
                <span>Chat with us</span>
                
            </a>
        </p>

        <h3>Follow Us</h3>

        <p>
            Stay connected with us for the latest arrivals, offers, and
            updates through our official social media channels.
        </p>

        </section>


        <section id="faq" className="care-section" >

        <h2>
        <span className="section-emoji">❓</span>
            Frequently Asked Questions
        </h2>

            <div className="faq-list">

            {

            faqs.map((faq,index)=>(

            <div
            key={index}
            className="faq-item"
            >

            <button
            className="faq-header"
            onClick={()=>setOpenFaq(
            openFaq===index ? null : index
            )}
            >

            <span>{faq.question}</span>

            <span>

            {openFaq===index ? "−" : "+"}

            </span>

            </button>

            <div
            className={`faq-content ${
            openFaq===index ? "open" : ""
            }`}
            >

            <p>{faq.answer}</p>

            </div>

            </div>

            ))

            }

            </div>

            </section>


        <section className="care-section">

        <h2>
        <span className="section-emoji">💬</span>
            Still Need Help?
        </h2>

    <p>
        Can't find the answer you're looking for?
        Our customer support team is always happy to help.
        <br></br><br></br>
        Our support team is available every day from <br></br>
        <strong> 11:00 AM – 10:00 PM</strong>.
    </p>

    <div className="help-buttons">

        <a
            href="https://wa.me/917868905884"
            target="_blank"
            rel="noreferrer"
            className="help-btn"
        >
            <img  src={whatsapp} alt="WhatsApp" />
            <span>WhatsApp Us</span>
            
        </a>

        <a
            href="tel:+917868905884"
            className="help-btn secondary"
        >
            <img  src={phone} alt="Call" />
            <span>Call Us</span>
        </a>

    </div>

</section>

        </div>

    );

}

export default CustomerCarePage;