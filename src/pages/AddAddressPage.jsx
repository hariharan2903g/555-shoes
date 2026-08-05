import { useNavigate, useLocation,} from "react-router-dom";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/555logo.png";
function AddAddressPage({
    setCartOpen,
    returnToCart,
    setReturnToCart
}) {
    const navigate = useNavigate();

const location = useLocation();

const mode =
    location.state?.mode || "new";

const editingAddress =
    location.state?.address || null;
    const [formData, setFormData] =
useState({
  type: "Home",
  label: "",

  name:"",
  phone:"",
  alternatePhone:"",

  house:"",
  street:"",
  area:"",

  city:"",
  state:"",
  pincode:"",
});
const [initialFormData, setInitialFormData] = useState(formData);
const [showDiscardPopup, setShowDiscardPopup] = useState(false);


useEffect(() => {

  if (mode === "edit" && editingAddress) {

    setFormData(editingAddress);
    setInitialFormData(editingAddress);

} else {

    const savedAddresses =
    JSON.parse(localStorage.getItem("addresses")) || [];

const hasHome =
    savedAddresses.some(address => address.type === "Home");

const hasWork =
    savedAddresses.some(address => address.type === "Work");

const defaultType =
    !hasHome
        ? "Home"
        : !hasWork
        ? "Work"
        : "Other";

const emptyForm = {
    type: defaultType,
    label: "",

    name: "",
    phone: "",
    alternatePhone: "",

    house: "",
    street: "",
    area: "",

    city: "",
    state: "",
    pincode: ""
};

    setFormData(emptyForm);
    setInitialFormData(emptyForm);

}

}, [mode, editingAddress]);

useEffect(() => {

  if (mode === "edit") {

      setLoadingAddress(false);

  }

}, [mode]);

useEffect(() => {

  window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
  });

}, [mode, editingAddress]);

const [errors, setErrors] = useState({
  name: "",
  phone: "",
  pincode: "",
  city: "",
  state: "",
  area: "",
  street: "",
  house: "",
  label: "",
  duplicate: ""
});

const nameRef = useRef(null);
const phoneRef = useRef(null);
const alternatePhoneRef = useRef(null);
const pincodeRef = useRef(null);
const cityRef = useRef(null);
const stateRef = useRef(null);
const areaRef = useRef(null);
const streetRef = useRef(null);
const houseRef = useRef(null);
const labelRef = useRef(null);
const isSavingRef = useRef(false);

const [loadingPincode, setLoadingPincode] = useState(false);
const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);
const [duplicateAddress, setDuplicateAddress] = useState(null);
const [loadingAddress, setLoadingAddress] = useState(false);
const [loadingSave, setLoadingSave] = useState(false);
const [saveSuccess, setSaveSuccess] = useState(false);
const handleChange = (e) => {

  let value = e.target.value;
  if (
    e.target.name === "name" ||
    e.target.name === "city" ||
    e.target.name === "area" 
    
) {
    value = value.replace(
        /\b\w/g,
        char => char.toUpperCase()
    );
}

  if (
      e.target.name === "phone" ||
      e.target.name === "alternatePhone" ||
      e.target.name === "pincode"
  ) {
      value = value.replace(/\D/g, "");
  }

  // Pincode lookup
  if (e.target.name === "pincode") {

      setFormData(prev => ({
          ...prev,
          pincode: value
      }));

      if (value.length === 6) {
        setLoadingPincode(true);
          fetch(`https://api.postalpincode.in/pincode/${value}`)
              .then(res => res.json())
              .then(data => {
                setLoadingPincode(false);

                  if (
                      data[0].Status === "Success" &&
                      data[0].PostOffice.length > 0
                  ) {

                      const office = data[0].PostOffice[0];

                      setFormData(prev => ({
                          ...prev,
                          pincode: value,
                          area: office.Name,
                          city: office.District,
                          state: office.State
                      }));

                      setTimeout(() => {
                        areaRef.current?.focus();
                    }, 100);

                  } else {
                    setLoadingPincode(false);

                      setFormData(prev => ({
                          ...prev,
                          area: "",
                          city: "",
                          state: ""
                      }));

                  }

              })
              .catch(() => {

                setLoadingPincode(false);
            
            });

      }

      setErrors(prev => {

        const updatedErrors = {
            ...prev
        };
    
        if (e.target.name === "name") {
    
            if (!value.trim()) {
    
                updatedErrors.name = "Please enter your name";
    
            } else if (!/^[A-Za-z ]+$/.test(value)) {
    
                updatedErrors.name = "Only letters are allowed";
    
            } else {
    
                updatedErrors.name = "";
    
            }
    
        }
    
        if (e.target.name === "phone") {
    
            updatedErrors.phone =
                value.length === 10
                    ? ""
                    : "Please enter a valid phone number";
    
        }
    
        if (e.target.name === "pincode") {
    
            updatedErrors.pincode =
                value.length === 6
                    ? ""
                    : "Please enter a valid pincode";
    
        }
    
        return updatedErrors;
    
    });

      return;
  }

  setFormData(prev => ({
      ...prev,
      [e.target.name]: value,
  }));

  setErrors(prev => ({
    ...prev,
    [e.target.name]: "",
    duplicate: ""
}));

};

  const savedAddresses =
  JSON.parse(localStorage.getItem("addresses")) || [];

const hasHome =
savedAddresses.some(address =>
  address.type === "Home"
);

const hasWork =
savedAddresses.some(address =>
  address.type === "Work"
);

const otherCount =
    savedAddresses.filter(
        address => address.type === "Other"
    ).length;

const hasReachedOtherLimit =
    otherCount >= 8;

const hasChanges =
JSON.stringify(formData) !== JSON.stringify(initialFormData);

function normalize(value) {

  return value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

}

useEffect(() => {

  if (!hasChanges) return;

  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {

      setShowDiscardPopup(true);

      window.history.pushState(null, "", window.location.href);

  };

  window.addEventListener("popstate", handlePopState);

  return () => {

      window.removeEventListener("popstate", handlePopState);

  };

}, [hasChanges]);

      function saveAddress() {

        if (isSavingRef.current) return;

          isSavingRef.current = true;

                const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter your name";
        }

        if (formData.phone.length !== 10) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (formData.pincode.length !== 6) {
            newErrors.pincode = "Please enter a valid pincode";
        }

        if (!formData.city.trim()) {
          newErrors.city = "Please enter a city.";
      }
      
      if (!formData.state.trim()) {
          newErrors.state = "Please enter a state.";
      }
      
      if (!formData.area.trim()) {
          newErrors.area = "Please enter your locality.";
      }
      
      if (!formData.street.trim()) {
          newErrors.street = "Please enter a street.";
      }
      
      if (!formData.house.trim()) {
          newErrors.house = "Please enter your door/flat number.";
      }
      
      if (formData.type === "Other" && !formData.label.trim()) {
          newErrors.label = "Please enter a nickname.";
      }

      setErrors(newErrors);

      if (newErrors.name) {

        isSavingRef.current = false;
    
        nameRef.current?.focus();
        return;
    
    }
    
    if (newErrors.phone) {
      isSavingRef.current = false;
        phoneRef.current?.focus();
        return;
    
    }
    
    if (newErrors.pincode) {
      isSavingRef.current = false;
    
        pincodeRef.current?.focus();
        return;
    
    }
    
    if (newErrors.city) {
      isSavingRef.current = false;
    
        cityRef.current?.focus();
        return;
    
    }

    if (newErrors.state) {
      isSavingRef.current = false;

      stateRef.current?.focus();
      return;
  
  }
    
    if (newErrors.area) {
      isSavingRef.current = false;
    
        areaRef.current?.focus();
        return;
    
    }
    
    if (newErrors.street) {
      isSavingRef.current = false;
    
        streetRef.current?.focus();
        return;
    
    }
    
    if (newErrors.house) {
      isSavingRef.current = false;
    
        houseRef.current?.focus();
        return;
    
    }
    
    if (newErrors.label) {
      isSavingRef.current = false;
    
        labelRef.current?.focus();
        return;
    
    }

        const savedAddresses =
            JSON.parse(localStorage.getItem("addresses")) || [];

            const duplicate = savedAddresses.find(address =>

              normalize(address.house) === normalize(formData.house) &&
              normalize(address.street) === normalize(formData.street) &&
              normalize(address.area) === normalize(formData.area) &&
              normalize(address.city) === normalize(formData.city) &&
              address.pincode === formData.pincode
          
          );
              
              if (duplicate && mode !== "edit") {

                isSavingRef.current = false;
            
                setDuplicateAddress(duplicate);
            
                setShowDuplicatePopup(true);
            
                return;
            
            }

            setLoadingSave(true);
    
        savedAddresses.forEach(address => {
            address.selected = false;
        });
    
        if (mode === "edit" && editingAddress) {

            const index = savedAddresses.findIndex(
                address => address.id === editingAddress.id
            );
        
            if (index !== -1) {
        
                savedAddresses[index] = {
                    ...formData,
                    id: editingAddress.id,
                    selected: true
                };
        
            } else {
        
                console.error(
                    "Edited address not found:",
                    editingAddress.id
                );
        
            }
        
        } else {
        
            if (
                formData.type === "Other" &&
                otherCount >= 8
            ) {
        
                alert("Maximum of 8 Other addresses allowed.");
                isSavingRef.current = false;
                return;
        
            }
        
            savedAddresses.push({
        
                id: crypto.randomUUID(),
        
                ...formData,
        
                selected: true
        
            });
        
        }
    
        localStorage.setItem(
          "addresses",
          JSON.stringify(savedAddresses)
      );
      console.log(savedAddresses);
      
      setTimeout(() => {
        
      
          setLoadingSave(false);
          isSavingRef.current = false;
          setSaveSuccess(true);
          setInitialFormData(formData);

          setShowDiscardPopup(false);
      
          setTimeout(() => {

            setSaveSuccess(false);

            window.dispatchEvent(
                new Event("addressUpdated")
            );
        
            if (location.state?.fromCart) {
        
                setCartOpen(true);
        
            }
            setShowDiscardPopup(false);

            if (location.state?.fromCart) {

                navigate(location.state.returnTo || "/", {
                    replace: true
                });

            } else {

                navigate(-1);

            }
        
        }, 900);
      
      }, 400);
    }

   

    return (

        <div className="add-address-page">

<div className="address-topbar">

    <button
        className="back-btn"
        onClick={() => {

          if (hasChanges) {
      
              setShowDiscardPopup(true);
      
          } else {
      
            navigate(-1);
      
          }
      
      }}
    >
        ←
    </button>

        <h2>
        {mode === "edit"
            ? "Edit Address"
            : "Add Address"}
    </h2>

    <button
        className="reset-btn"
        onClick={() => {

          if (mode === "edit") {

            setFormData(editingAddress);
            setInitialFormData(editingAddress);
        
        } else {
        
            setFormData({
                type: "Home",
                label: "",
        
                name: "",
                phone: "",
                alternatePhone: "",
        
                house: "",
                street: "",
                area: "",
        
                city: "",
                state: "",
                pincode: ""
            });
        }
            setErrors({
              name: "",
              phone: "",
              pincode: "",
              city: "",
              state: "",
              area: "",
              street: "",
              house: "",
              label: ""
          });

          setLoadingPincode(false);

        }}
    >
        {mode === "edit"
    ? "Revert"
    : "Reset"}

    </button>

</div>



<div className="section-card">

<h3>Contact Info</h3>

      <div className="input-group">
      <div className="floating-input">

      <input
        className={errors.name ? "input-error" : ""}
        ref={nameRef}

        onKeyDown={(e) => {
          if (e.key === "Enter") {
              phoneRef.current?.focus();
          }
      }}
          name="name"
          autoComplete="name"
          placeholder=" "
          value={formData.name}
          onChange={handleChange}
      />
       <label className={formData.name ? "label-active" : ""}>Name</label>
      {errors.name && (
    <p className="error-text">{errors.name}</p>
    )}

      </div>
      </div>

      <div className="input-group">
      <div className="floating-input">

        <input
         className={errors.phone ? "input-error" : ""}
         ref={phoneRef}

         onKeyDown={(e) => {
          if (e.key === "Enter") {
              document.querySelector(
                  'input[name="alternatePhone"]'
              )?.focus();
          }
      }}

          name="phone"
           autoComplete="tel"
           placeholder=" "
          value={formData.phone}
          type="tel"
          maxLength={10}    
          onChange={handleChange}
        />
        <label className={formData.phone ? "label-active" : ""}>Contact number</label>


          {errors.phone && (
              <p className="error-text">{errors.phone}</p>
          )}

        </div>
        </div>

        <div className="input-group">
        <div className="floating-input">


        <input
        ref={alternatePhoneRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              pincodeRef.current?.focus();
          }
      }}
        name="alternatePhone"
        autoComplete="tel-national"
        placeholder=" "
        value={formData.alternatePhone}
        type="tel"
        maxLength={10}
        onChange={handleChange}
        />
              <label className={formData.alternatePhone ? "label-active" : ""}>Alternate contact</label>

        </div>
        </div>
        </div>    

        <div className="section-card">

<h3>Address Info</h3>

<div className="row">

    <div className="input-group">
    <div className="floating-input">


        <input
            className={errors.pincode ? "input-error" : ""}
            ref={pincodeRef}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                  streetRef.current?.focus();
              }
          }}

            name="pincode"
            placeholder=" "
             autoComplete="postal-code"
            value={formData.pincode}
            type="tel"
            maxLength={6}
            onChange={handleChange}
        />
                <label className={formData.pincode ? "label-active" : ""}>Pincode</label>


          {loadingPincode && (
              <p className="loading-text">
                  Looking up pincode...
              </p>
          )}

          {errors.pincode && (
              <p className="error-text">{errors.pincode}</p>
          )}

    </div>
    </div>

   <div className="input-group">
   <div className="floating-input">


    <input
        className={errors.city ? "input-error" : ""}
        ref={cityRef}
        name="city"
        placeholder=" "
        autoComplete="address-level2"
        value={formData.city}
        onChange={handleChange}
    />
        <label className={formData.city ? "label-active" : ""}>City</label>


    {errors.city && (
        <p className="error-text">{errors.city}</p>
    )}

</div>
</div>
</div>

<div className="input-group">
<div className="floating-input">


        <input
        className={errors.state ? "input-error" : ""}
        ref={stateRef}
        name="state"
        placeholder=" "
        value={formData.state}
        readOnly
    />
        <label className={formData.state ? "label-active" : ""}>State</label>


    {errors.state && (
        <p className="error-text">{errors.state}</p>
    )}

</div>
</div>


<div className="input-group">
<div className="floating-input">


    <input
        className={errors.area ? "input-error" : ""}
        ref={areaRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              houseRef.current?.focus();
          }
      }}
        name="area"
        placeholder=" "
        autoComplete="address-line2"
        value={formData.area}
        onChange={handleChange}
    />

<label className={formData.area ? "label-active" : ""}>Area / Locality</label>


    {errors.area && (
        <p className="error-text">{errors.area}</p>
    )}

</div>
</div>

<div className="input-group">
<div className="floating-input">


    <input
        className={errors.street ? "input-error" : ""}
        ref={streetRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              houseRef.current?.focus();
          }
      }}
        name="street"
        placeholder=" "
        autoComplete="street-address"
        value={formData.street}
        onChange={handleChange}
    />
        <label className={formData.street ? "label-active" : ""}>Street</label>


    {errors.street && (
        <p className="error-text">{errors.street}</p>
    )}

</div>
</div>


<div className="input-group">
<div className="floating-input">


    <input
        className={errors.house ? "input-error" : ""}
        ref={houseRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              saveAddress();
          }
      }}
        name="house"
        placeholder=" "
        autoComplete="address-line1"
        value={formData.house}
        onChange={handleChange}
    />
        <label className={formData.house ? "label-active" : ""}>Door No / Flat No</label>


    {errors.house && (
        <p className="error-text">{errors.house}</p>
    )}

   

</div>
</div>

</div>

<div className="address-types">

<div className="address-radio-group">

<label>

<input
    type="radio"
    name="type"
    value="Home"
    checked={formData.type === "Home"}
    disabled={hasHome && mode !== "edit"}
    onChange={handleChange}
/>

🏠 Home 

</label>

<label>

<input
    type="radio"
    name="type"
    value="Work"
    checked={formData.type === "Work"}
    disabled={hasWork && mode !== "edit"}
    onChange={handleChange}
/>

💼 Work 

</label>

<label>

<input
    type="radio"
    name="type"
    value="Other"
    disabled={
        hasReachedOtherLimit &&
        mode !== "edit"
    }
    checked={formData.type === "Other"}
    onChange={handleChange}
/>

📍 Others

</label>

</div>

</div>


{formData.type === "Other" && (

<input
ref={labelRef}
name="label"

value={formData.label}

placeholder="Nickname (Example: Grandma's House)"

onChange={handleChange}

/>

)}


<button
    className="save-address-btn"
    onClick={saveAddress}
    disabled={loadingPincode || loadingSave}
>
      {
      loadingSave
      ? "Saving Address..."

      : loadingPincode
      ? "Looking up pincode..."

      : mode === "edit"
      ? "Update Address"

      : "Save Address"
      }

</button>

{showDuplicatePopup && (

<div
    className="popup-overlay"
    onClick={() => setShowDuplicatePopup(false)}
>

    <div
        className="duplicate-popup"
        onClick={(e) => e.stopPropagation()}
    >

        <h3>Address already exists</h3>

        <p>
            You've already saved this address.
        </p>
     
         <div className="popup-actions">

    <button
        className="popup-secondary-btn"
        onClick={() => setShowDuplicatePopup(false)}
    >
        Keep Editing
    </button>

    <button
    className="popup-btn"
    onClick={() => {

        setShowDuplicatePopup(false);

        setLoadingAddress(true);

        setTimeout(() => {

            navigate("/add-address", {
                replace: true,
                state: {
                    mode: "edit",
                    address: duplicateAddress,
                    fromCart: location.state?.fromCart,
                    returnTo: location.state?.returnTo
                }
            });

        }, 700);

    }}
>
    View Address
</button>
</div>
      </div>
     
    </div>


)}

{showDiscardPopup && (

<div
    className="popup-overlay"
    onClick={() => {

      setShowDiscardPopup(false);
  
  
  }}
>

    <div
        className="duplicate-popup"
        onClick={(e) => e.stopPropagation()}
    >

        <h3>Discard changes?</h3>

        <p>
            You have unsaved changes.
        </p>

        <div className="popup-actions">

            <button
                className="popup-secondary-btn"
                onClick={() => setShowDiscardPopup(false)}
            >
                Keep Editing
            </button>

            <button
          className="popup-btn"
          onClick={() => {  navigate(-1); }}
      >
          Discard
      </button>

        </div>

    </div>

</div>

)}

{saveSuccess && (

<div className="loading-overlay">

    <div className="loading-card">

        <div className="success-check">

            ✓

        </div>

        <h3>Address Saved</h3>

        <p>Your address has been saved successfully.</p>

    </div>

</div>

)}

{loadingAddress && (

<div className="loading-overlay">

    <div className="loading-card">

        <img
            src={logo}
            alt="555 Shoes"
            className="loading-logo"
        />

        <p>Opening address...</p>

    </div>

</div>

)}

</div>
    )
}
export default AddAddressPage;