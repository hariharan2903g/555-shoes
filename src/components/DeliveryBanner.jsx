import "./DeliveryBanner.css";
import { FiMapPin } from "react-icons/fi";

function DeliveryBanner({
    selectedAddress,
    onOpen
}) {

    <div
    className="delivery-banner"
    onClick={onOpen}
>

    <div className="delivery-banner-left">

        <FiMapPin />

        <div>

            <div className="delivery-title">
                Deliver to
            </div>

            {
                selectedAddress ?

                <div className="delivery-address">

                    {selectedAddress.name},
                    {" "}
                    {selectedAddress.area}

                </div>

                :

                <div className="delivery-empty">

                    Add Address

                </div>

            }

        </div>

    </div>

    <button className="delivery-change-btn">

        {
            selectedAddress ?

            "Change"

            :

            "+ Add"
        }

    </button>

</div>
}
export default DeliveryBanner;