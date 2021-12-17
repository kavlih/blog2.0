import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const FormInput = ({ type, name, label, id, value, focus, errors, onChange, onBlur}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);    
  
  const handleMouseDown = (e) => {
    // keeps focus on input
    e.preventDefault();
    setIsPasswordVisible(isPasswordVisible ? false : true);
  }

  console.log();

  return (
    <div className="m-input-container mb-3">
        {/* label */}
        <label htmlFor={id} className="form-label">{label}</label>

        {/* input group */}
        <div className="m-input-group">
          {/* input */}
          <input 
            type={type === "password" ? (isPasswordVisible ? "text" : "password") : type} 
            className={`form-control ${errors.length > 0 ? "is-invalid" : ""}`} 
            id={id} 
            name={name} 
            value={value} 
            onChange={onChange} 
            autoFocus={focus}
          />
          {/* input button (password only) */}
          {type === "password" && (
              <button 
                  className="btn position-absolute m-toggle-password" 
                  type="button" 
                  id="button-addon2"
                  tabIndex="-1"
                  onMouseDown={handleMouseDown}
              >
                  <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </button>
          )}
          {/* errors */}
          {errors.length > 0 && <div className="invalid-feedback">{errors}</div>}
          {/* password requirements */}
          {type === "password" && (
            <div className="m-password-conditions">
              <small>
                <ul className="list-group">
                  <li className={`${!errors.includes("lenght")  && value ? "valid" : ""}`}>Use 8 or more characters</li>
                  <li className={`${!errors.includes("letter")  && value ? "valid" : ""}`}>Use upper and lower case characters</li>
                  <li className={`${!errors.includes("number")  && value ? "valid" : ""}`}>Use a number</li>
                  <li className={`${!errors.includes("special") && value ? "valid" : ""}`}>Use a speacial character</li>
                </ul>
              </small>
            </div>
          )}
        </div>
    </div>
  );
}

export default FormInput;
