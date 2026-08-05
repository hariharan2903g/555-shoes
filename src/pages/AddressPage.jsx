import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "../App.css";

function AddressPage() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    console.log("AddressPage Rendered");
console.log(
    JSON.parse(localStorage.getItem("addresses"))
);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({
        show: false,
        message: ""
    });

    useEffect(() => {

        function loadAddresses() {
    
            const saved =
                JSON.parse(localStorage.getItem("addresses")) || [];
    
            saved.sort((a, b) => {
    
                if (a.selected && !b.selected) return -1;
                if (!a.selected && b.selected) return 1;
    
                return 0;
    
            });
    
            setAddresses(saved);
    
            setSelectedId(
                saved.find(address => address.selected)?.id
            );
    
        }
    
        loadAddresses();
    
        window.addEventListener("focus", loadAddresses);
        window.addEventListener("addressUpdated", loadAddresses);
    
        return () => {
    
            window.removeEventListener("focus", loadAddresses);
            window.removeEventListener("addressUpdated", loadAddresses);
    
        };
    
    }, []);

    function selectAddress(id) {

        const updated = addresses.map(address => ({
            ...address,
            selected: address.id === id
        }));
    
        updated.sort((a, b) => {
    
            if (a.selected && !b.selected) return -1;
            if (!a.selected && b.selected) return 1;
    
            return 0;
    
        });
    
        setAddresses(updated);
    
        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );
    
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
    
            updated.sort((a, b) => {

                if (a.selected && !b.selected) return -1;
            
                if (!a.selected && b.selected) return 1;
            
                return 0;
            
            });
            
            setAddresses(updated);

        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );
    
    }

    return (

        <div
            className="address-page"
        >

            <div className="address-header">

            <button
                className="address-back-btn"
                onClick={() => navigate(-1)}
            >
                ←
            </button>

            <h2>Select Delivery Address</h2>

            <button
                className="add-new-btn"
                onClick={() =>
                    navigate("/add-address", {
                        state: {
                            mode: "new"
                        }
                    })
                }
            >
                + Add New
            </button>

            </div>

            {addresses.map((address) => (

<div
    key={address.id}
    className={`sheet-address-card ${
        selectedId === address.id ? "selected" : ""
    }`}
    style={{
        transition:"all .35s ease",
        transform:
            selectedId === address.id
                ? "translateY(-2px)"
                : "translateY(0)"
    }}
    onClick={() => setSelectedId(address.id)}> 

<div className="sheet-card-top">

<div className="sheet-title">

    <div
        className={`sheet-radio ${
            selectedId === address.id ? "active" : ""
        }`}
    />

    <div>

        <strong>{address.type}</strong>

    </div>

</div>

{address.selected && (
        <span className="selected-badge">

        ✓ Selected

    </span>

)}

</div>

<div className="address-details">

<p className="address-name">
    {address.name}
</p>

<p className="address-line">
    {address.house}, {address.street}
</p>

<p className="address-line">
    {address.area}
</p>

<p className="address-line">
    {address.city} - {address.pincode}
</p>

<p className="address-phone">
    {address.phone}
</p>

</div>

<div className="address-icons">

<button
    className="icon-btn"
    onClick={(e)=>{

        e.stopPropagation();

        navigate("/add-address",{
            state:{
                mode:"edit",
                address
            }
        });

    }}
>
    <FiEdit2/>
</button>

<button
    className="icon-btn delete"
    onClick={(e)=>{

        e.stopPropagation();

        setDeleteTarget(address);

    }}
>
    <FiTrash2/>
</button>

</div>
</div>

))}

            {deleteTarget && (

<div
    className="popup-overlay"
    onClick={() => setDeleteTarget(null)}
>

    <div
        className="duplicate-popup"
        onClick={(e) => e.stopPropagation()}
    >

        <h3>Delete Address?</h3>

        <p>

            Are you sure you want to delete this address?

        </p>

        <div className="popup-actions">

            <button
                className="popup-secondary-btn"
                onClick={() =>
                    setDeleteTarget(null)
                }
            >
                Cancel
            </button>

            <button
                className="popup-btn"
                onClick={() => {

                    deleteAddress(deleteTarget.id);

                    setDeleteTarget(null);

                }}
            >
                Delete
            </button>

        </div>

    </div>
                    
</div>

)}
<div className="address-footer">

<button
    className="deliver-here-btn"
    disabled={!addresses.some(a => a.selected)}
    onClick={() => {

        if (!selectedId) return;
    
        const updated = addresses.map(address => ({
            ...address,
            selected: address.id === selectedId
        }));
    
        updated.sort((a, b) => {
    
            if (a.selected && !b.selected) return -1;
    
            if (!a.selected && b.selected) return 1;
    
            return 0;
    
        });
    

        setTimeout(() => {
        
            setAddresses(updated);
        
            localStorage.setItem(
                "addresses",
                JSON.stringify(updated)
            );
        
            setToast({
                show: true,
                message: "✓ Address Selected"
            });
            
            setTimeout(() => {
                setToast({
                    show: false,
                    message: ""
                });
            }, 1800);
        
        }, 150);
        
        setTimeout(() => {
        
            navigate(-1);
        
        }, 1200);
    
    }}
>
    Deliver Here
</button>

</div>

{toast.show && (

<div className="app-toast">

    {toast.message}

</div>

)}


        </div>
        

    );

}

export default AddressPage;