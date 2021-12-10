import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const FormInput = ({ type = "text", name = "default", label = "", id = "", value = "", focus = false, errors, onChange}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);    
  
  const handleClick = () => {
    setIsPasswordVisible(isPasswordVisible ? false : true);
  }

  return (
    <div className="mb-3">
        {/* show label if not checkbox */}
        {type !== "checkbox" && (
          <label htmlFor={id} className="form-label">{label}</label>
        )}
        <div className={`m-input-group ${type === "checkbox" ? "form-check" : "input-group"}`}>
          {/* show input button */}
          {name === "password" && (
              <button 
                  className="btn position-absolute togglePassword" 
                  type="button" 
                  id="button-addon2"
                  onClick={handleClick} 
              >
                  <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </button>
          )}
          {/* show input */}
          <input 
            type={name === "password" ? (isPasswordVisible ? "text" : "password") : type} 
            className={`${type === "checkbox" ? "form-check-input" : "form-control"} ${errors.length > 0 ? "is-invalid" : ""}`} 
            id={id} name={name} 
            value={value} 
            onChange={onChange} 
            autoFocus={focus}
          />
          {/* show label if checkbox */}
          {type === "checkbox" && (
          <label htmlFor={id} className="form-check-label">{label}</label>
          )}
          {/* show errors */}
          {errors.length > 0 && (
              <div className="invalid-feedback">{errors}</div>
          )}
        </div>
    </div>
  );
}

export default FormInput;
