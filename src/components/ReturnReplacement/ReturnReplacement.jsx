import "./ReturnReplacement.css";
import whatsappLogo from "../../assets/brands/whatsapp.png";
import {
    MdOutlineAssignmentReturn,
    MdOutlineCheckCircle,
    MdOutlineCancel,
    MdOutlineSupportAgent
} from "react-icons/md";

import { FiPhone } from "react-icons/fi";

function ReturnReplacement() {

    return (

        <div className="return-sheet">

            <div className="policy-card">

                <div className="policy-heading">

                <MdOutlineAssignmentReturn className="policy-icon return-icon" />

                    <h3>7-Day Replacement Policy</h3>

                </div>

                <p>

                        We currently do not accept returns unless the product
                        is received in a damaged condition.

                        <br /><br />

                        For damaged product claims, an
                        <strong> unboxing video </strong>
                        recorded from the moment the package is opened is
                        mandatory for verification.

                        </p>

            </div>

            <div className="policy-card">

                <div className="policy-heading">

                <MdOutlineCheckCircle className="policy-icon success-icon" />

                    <h3>Eligible for Replacement</h3>

                </div>

                <ul>

                    <li>Wrong size delivered</li>

                    <li>Wrong product delivered</li>

                    <li>Manufacturing defects</li>

                    <li>Product received in damaged condition</li>

                </ul>

            </div>

            <div className="policy-card">

                <div className="policy-heading">

                <MdOutlineCancel className="policy-icon danger-icon" />

                    <h3>Not Eligible for Replacement</h3>

                </div>

                <ul>

                        <li>Product has been worn or used</li>

                        <li> shoe box is missing</li>

                        <li>Original tags or accessories are missing</li>

                        <li>Damage caused after delivery</li>

                    </ul>

            </div>

            <div className="policy-card">

                <div className="policy-heading">

                <MdOutlineSupportAgent className="policy-icon support-icon" />

                    <h3>How it Works</h3>

                </div>

                <ol>

                    <li>Contact us through WhatsApp within 7 days of delivery.</li>

                    <li>Share your Order ID along with the unboxing video (if claiming damage).</li>

                    <li>Our team will verify your request.</li>

                    <li>Once approved, we'll arrange a replacement or guide you through the replacement process.</li>

                </ol>

            </div>

            <div className="policy-card">

                <h3>Replacement Approval</h3>

                <p>

                    Once your request is approved after verification,
                    we'll process a replacement as quickly as possible.

                    </p>

                    <p>

                    In exceptional cases where a replacement isn't available,
                    our support team will assist you with the best possible
                    resolution.

                    </p>

            </div>

            <div className="policy-card help-card">

                <h3>Need Help?</h3>

                <a
                    href="https://wa.me/917868905884"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="help-item"
                >

                    <img
                        src={whatsappLogo}
                        alt="WhatsApp"
                        className="help-icon"
                    />

                    <span>Chat on WhatsApp</span>

                </a>

                <a
                    href="tel:+917868905884"
                    className="help-item"
                >

                    <FiPhone className="phone-icon" />

                    <span>Call us</span>

                </a>

                </div>

        </div>

    );

}

export default ReturnReplacement;