import React, { useState } from "react";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const FormField = ({ fieldName, type, id, className, value, autoFocus, onChange, onBlur, onFocus }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);    
   
   const handleMouseDown = (e) => {
      // keeps focus on input
      e.preventDefault();
      setIsPasswordVisible(isPasswordVisible ? false : true);
   }

   return (
      <>
         {/* input */}
         <input 
            type={type === "password" ? (isPasswordVisible ? "text" : "password") : type} 
            className={`form-control ${className}`} 
            id={id} 
            name={fieldName} 
            autoFocus={autoFocus}
            value={value} 
            onChange={onChange} 
            onBlur={onBlur} 
            onFocus={onFocus} 
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
      </>
   );
}

const FormTooltip = ({ fieldName, message }) => {
   return (
      <div className="m-tooltip-container">
         <div className="tooltip show bs-tooltip-start">
               <div className="tooltip-arrow"></div>
               <div className={`tooltip-inner ${fieldName}`}>
                  <small>{message}</small>
               </div>
         </div>
      </div>
   );
}

const FormErrors = ({ fieldName, errors, fieldFocus }) => {
   return (errors.length > 0 && !fieldFocus[fieldName] && <div className="invalid-feedback">{errors}</div>)
}

export { FormField, FormTooltip, FormErrors };