import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRef } from "react";
import "../App.css";

function AddressSheet({
    open,
    onClose,
    onAddressSelected
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [addresses, setAddresses] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [displayAddresses, setDisplayAddresses] = useState([]);
    const cardRefs = useRef({});
    const listRef = useRef(null);
    const [highlightCard, setHighlightCard] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [showLimitToast, setShowLimitToast] = useState(false);

    useEffect(() => {

        if (!open) return;
    
        function loadAddresses() {
    
            const saved =
                JSON.parse(localStorage.getItem("addresses")) || [];
    
            saved.sort((a, b) => {
    
                if (a.selected && !b.selected) return -1;
                if (!a.selected && b.selected) return 1;
    
                return 0;
    
            });
    
            setAddresses(saved);
            setDisplayAddresses(saved);
            setSelectedId(
                saved.find(a => a.selected)?.id
            );
        }
    
        loadAddresses();
    
        window.addEventListener("addressUpdated", loadAddresses);
    
        return () => {
    
            window.removeEventListener(
                "addressUpdated",
                loadAddresses
            );
    
        };
    
    }, [open]);

    function selectAddress(id) {

        //  setSelectedId(id);

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

    //     console.log("Deleting:", id);

    // console.log(
    //     JSON.parse(localStorage.getItem("addresses"))
    // );

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

    const totalAddresses = addresses.length;

    const maxAddressesReached = totalAddresses >= 7;

    return (
        <>
        
        <div
            className={`sheet-overlay ${open ? "show" : ""}`}
            onClick={onClose}
        />
        
        <div
            className={`address-sheet ${open ? "show" : ""}`}
        >

<div className="address-header">

<button
    className="address-back-btn"
    onClick={onClose}
>
    X
</button>

<h2>Select Delivery Address</h2>

<button
    className={`add-new-btn ${maxAddressesReached ? "limit-reached" : ""}`}
    onClick={() => {

        if (maxAddressesReached) {

            setShowLimitToast(true);

            setTimeout(() => {

                setShowLimitToast(false);

            }, 2200);

            return;

        }

        onClose();

        navigate("/add-address", {
            state: {
                mode: "new",
                fromCart: true,
                returnTo: location.pathname
            }
        });

    }}
>
    + Add New
</button>

</div>

{/* {maxAddressesReached && (
<p className="address-limit">
    You've reached the maximum limit of saved addresses.
</p>
)} */}
            <div
                className="address-list"
                ref={listRef}
            >
            {displayAddresses.map((address) => (

// ${shrinkingId === address.id ? "shrinking" : ""} 

<div
    key={address.id}
    ref={(el) => {
        if (el) cardRefs.current[address.id] = el;
    }}
    className={`sheet-address-card
        ${selectedId === address.id ? "selected" : ""}
        ${highlightCard === address.id ? "card-highlight" : ""}
        ${deletingId === address.id ? "deleting" : ""}
        ${animating ? "reordering" : ""}
    `}
    onClick={() => setSelectedId(address.id)}
>

<div className="sheet-card-top">

<div className="sheet-title">

    <div
        className={`sheet-radio ${
            selectedId === address.id ? "active" : ""
        }`}
    />

    <div>

    {/* <strong>
{
    address.type === "Other"
        ? address.label
        : address.type
}
</strong> */}

<strong>
    {address.type === "Home" && "🏠 Home"}

    {address.type === "Work" && "💼 Work"}

    {address.type === "Other" &&
        `📍 ${address.label}`}
</strong>

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
    
        onClose();
    
        navigate("/add-address", {
            state: {
                mode: "edit",
                address,
                fromCart: true,
                returnTo: location.pathname
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
</div>

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

                    const id = deleteTarget.id;
                
                    setDeleteTarget(null);
                
                    setTimeout(() => {
                
                        setDeletingId(id);
                
                        setTimeout(() => {
                
                            deleteAddress(id);
                
                            setDeletingId(null);
                
                        }, 320);
                
                    }, 150);
                
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
    disabled={!selectedId}
    onClick={() => {

        if (!selectedId) return;

        const firstPositions = {};

        addresses.forEach(address => {

        const element = cardRefs.current[address.id];

     if (element) {

        firstPositions[address.id] =
            element.getBoundingClientRect().top;

    }

});
    
        const updated = addresses.map(address => ({
            ...address,
            selected: address.id === selectedId
        }));
    
        updated.sort((a, b) => {
    
            if (a.selected && !b.selected) return -1;
    
            if (!a.selected && b.selected) return 1;
    
            return 0;
    
        });
        // setShrinkingId(selectedId);

        setTimeout(() => {

            flushSync(() => {
        
                setDisplayAddresses(updated);
                setAddresses(updated);

                localStorage.setItem(
                    "addresses",
                    JSON.stringify(updated)
                );
                
                setHighlightCard(selectedId);
        
            });
        
            listRef.current?.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        
            requestAnimationFrame(() => {
        
                updated.forEach(address => {
        
                    const element = cardRefs.current[address.id];
        
                    if (!element) return;
        
                    const last = element.getBoundingClientRect().top;
        
                    const first = firstPositions[address.id];
        
                    const delta = first - last;
        
                    if (delta === 0) return;
        
                    element.style.transition = "none";
                    element.style.transform = `translateY(${delta}px)`;
        
                    requestAnimationFrame(() => {
        
                        element.style.transition =
                            "transform .55s cubic-bezier(.22,1,.36,1)";
        
                        element.style.transform = "translateY(0)";
        
                    });
        
                });
        
            });
        
        }, 120);
        
        setTimeout(() => {

            setAnimating(false);
            // setShrinkingId(null);
            setHighlightCard(null);
        
            onAddressSelected();

            onClose();
        
        }, 950);
    }}
>
    Deliver Here
</button>

</div>

        </div>

        {showLimitToast && (

<div className="limit-toast">

⚠️ Saved addresses limit reached

</div>

)}
        
        </>

);

}

export default AddressSheet;