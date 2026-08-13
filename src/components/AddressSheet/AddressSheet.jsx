function AddressSheet({
    open,
    onClose,
    selectedAddress,
    setSelectedAddress
}) {

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
                mode: "new",
                fromAddressSheet: true
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

    navigate("/add-address", {
        state: {
            mode: "edit",
            address,
            fromAddressSheet: true
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

    setAnimating(true);

    setTimeout(() => {
    
        setAddresses(updated);
    
        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );
    
        setShowToast(true);
    
    }, 150);
    
    setTimeout(() => {
    
        navigate(-1);
    
    }, 1200);

}}
>
Deliver Here
</button>

</div>

{showToast && (

<div className="address-toast">

✓ Address Selected

</div>

)}


    </div>  
  );
}

export default AddressSheet;