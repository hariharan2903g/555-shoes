function FormInput({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
  }) {
    return (
      <div className="form-group">
  
        <label>{label}</label>
  
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
  
      </div>
    );
  }
  
  export default FormInput;