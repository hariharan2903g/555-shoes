import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { useState, useEffect, useRef } from "react";
function AddAddressPage() {

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


useEffect(() => {

  if (mode === "edit" && editingAddress) {

      setFormData(editingAddress);

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
  label: ""
});

const nameRef = useRef(null);
const phoneRef = useRef(null);
const pincodeRef = useRef(null);
const cityRef = useRef(null);
const stateRef = useRef(null);
const areaRef = useRef(null);
const streetRef = useRef(null);
const houseRef = useRef(null);
const labelRef = useRef(null);

const [loadingPincode, setLoadingPincode] = useState(false);

const handleChange = (e) => {

  let value = e.target.value;

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
      [e.target.name]: ""
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

      function saveAddress() {

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

        nameRef.current?.focus();
        return;
    
    }
    
    if (newErrors.phone) {
    
        phoneRef.current?.focus();
        return;
    
    }
    
    if (newErrors.pincode) {
    
        pincodeRef.current?.focus();
        return;
    
    }
    
    if (newErrors.city) {
    
        cityRef.current?.focus();
        return;
    
    }

    if (newErrors.state) {

      stateRef.current?.focus();
      return;
  
  }
    
    if (newErrors.area) {
    
        areaRef.current?.focus();
        return;
    
    }
    
    if (newErrors.street) {
    
        streetRef.current?.focus();
        return;
    
    }
    
    if (newErrors.house) {
    
        houseRef.current?.focus();
        return;
    
    }
    
    if (newErrors.label) {
    
        labelRef.current?.focus();
        return;
    
    }



      // if (Object.keys(newErrors).length > 0) {
      //     return;
      // }


        const savedAddresses =
            JSON.parse(localStorage.getItem("addresses")) || [];

        //     if (formData.phone.length !== 10) {

        //       setErrors(prev => ({
        //           ...prev,
        //           phone: "Please enter a valid mobile number."
        //       }));
          
        //       return;
          
        //   }
  
        //   if (formData.pincode.length !== 6) {

        //     setErrors(prev => ({
        //         ...prev,
        //         pincode: "Please enter a valid pincode."
        //     }));
        
        //     return;
        
        // }
  
  
        //         if (!formData.name.trim()) {

        //           setErrors(prev => ({
        //               ...prev,
        //               name: "Please enter your name."
        //           }));
              
        //           return;
              
        //       }
              
        //       if (!/^[A-Za-z ]+$/.test(formData.name)) {
              
        //           setErrors(prev => ({
        //               ...prev,
        //               name: "Only letters are allowed."
        //           }));
              
        //           return;
              
        //       }

            const duplicate = savedAddresses.find(address =>

              address.house === formData.house &&
              address.street === formData.street &&
              address.area === formData.area &&
              address.city === formData.city &&
              address.pincode === formData.pincode
              
              );
              
              if (duplicate && mode !== "edit") {

                alert("This address already exists.");
            
                return;
            
            }
    
        savedAddresses.forEach(address => {
            address.selected = false;
        });
    
        if (mode === "edit" && editingAddress) {
    
            const index = savedAddresses.findIndex(
                address => address.id === editingAddress.id
            );
    
            savedAddresses[index] = {

                ...formData,
            
                id: editingAddress.id,
            
                selected: true
            
            };
    
        } else {
    
          savedAddresses.push({

            id: crypto.randomUUID(),
            
            ...formData,
            
            selected: savedAddresses.length === 0
            
            });

           
    
        }
    
        localStorage.setItem(
            "addresses",
            JSON.stringify(savedAddresses)
        );
    
        navigate(-1);
    
    }

    return (

        <div className="add-address-page">

<div className="address-topbar">

    <button
        className="back-btn"
        onClick={() => navigate(-1)}
    >
        ←
    </button>

    <h2>Add Address</h2>

    <button
        className="reset-btn"
        onClick={() => {

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

        }}
    >
        Reset
    </button>

</div>



<div className="section-card">

<h3>Contact Info</h3>

      <div className="input-group">
      <div className="floating-input">

      <input
        className={errors.name ? "input-error" : ""}
        ref={nameRef}
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
>
    Save Address
</button>

</div>
    )
}
export default AddAddressPage;