import "./DeliveryInformation.css";
import stLogo from "../../assets/stcouriers.png";
import indiaPostLogo from "../../assets/indiapost.png";

function DeliveryInformation() {

    return (

        <div className="delivery-sheet">

            <h3>How Delivery Works</h3>

            <p>
                Once your order is confirmed, it is carefully packed
                and dispatched through one of our trusted delivery
                partners within <strong>24–48 hours</strong>.
            </p>

            <p>
                The estimated delivery days shown on the product page
                are approximate and may vary depending on your area,
                courier availability, local holidays or unforeseen
                delays.
            </p>

            <p>
                After your order has been dispatched, you'll receive
                an <strong> Order ID and Tracking Number </strong> so you can track your
                shipment until it reaches you.
            </p>

            <div className="delivery-partners">

                <h4>Our Delivery Partners</h4>

                <div className="partner-list">

                    <img
                        src={stLogo}
                        alt="ST Couriers"
                    />

                    <img
                        src={indiaPostLogo}
                        alt="India Post"
                    />

                </div>

            </div>

        </div>

    );

}

export default DeliveryInformation;