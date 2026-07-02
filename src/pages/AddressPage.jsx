import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddressPage() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {

        const saved =
            JSON.parse(localStorage.getItem("addresses")) || [];

        setAddresses(saved);

    }, []);

    function selectAddress(id) {

        const updated = addresses.map(address => ({
            ...address,
            selected: address.id === id
        }));

        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );

        navigate("/checkout");

    }

    function deleteAddress(id){

        console.log("Deleting:", id);

    console.log(
        JSON.parse(localStorage.getItem("addresses"))
    );

        const updated =
            addresses.filter(
                address => address.id !== id
            );
    
        setAddresses(updated);
    
        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );
    
    }

    return (

        <div className="address-page">

            <div className="address-header">

                <button
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>

                <h2>Select Delivery Address</h2>

            </div>

            {addresses.map(address => (

                <div
                    key={address.id}
                    className={`address-card ${
                        address.selected ? "selected" : ""
                    }`}
                    onClick={() => {}}
                >

                <div className="address-title">

                <div
                    className={
                    address.selected
                    ? "address-radio active"
                    : "address-radio"
                    }
                    />

                <h3>

                    {address.label}

                </h3>

                {address.selected && (

                    <span className="selected-badge">

                        Selected

                    </span>

                )}

                </div>

                <h4>

                {address.name}

                </h4>

                <p>

                {address.house}, {address.street}

                </p>

                <p>

                {address.area}, {address.city}

                </p>

                <p>

                {address.state} - {address.pincode}

                </p>

                    <p>
                        {address.phone}
                    </p>

                    <hr className="address-divider" />

                    <div className="address-actions">

    <button
        onClick={(e) => {

            e.stopPropagation();

            navigate("/add-address",{
                state:{
                    mode:"edit",
                    address
                }
            });

        }}
    >
        Edit
    </button>

    <button
        onClick={(e)=>{

            e.stopPropagation();

            deleteAddress(address.id);

        }}
    >
        Delete
    </button>

            {!address.selected && (

        <button
            className="deliver-btn"
            onClick={() =>
                selectAddress(address.id)
            }
        >
            Deliver Here
        </button>

        )}

</div>

                </div>

            ))}

            <button
                className="add-address-btn"
                onClick={() =>
                    navigate("/add-address", 
                        {
                        state: {
                            mode: "new"
                        }
                    })
                }
            >
                + Add New Address
            </button>

        </div>

    );

}

export default AddressPage;