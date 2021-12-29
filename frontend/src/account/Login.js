// TODO Alert on login fail
// TODO reset password

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { accountService } from '../_services';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = (props) => {
  const navigate = useNavigate();

  const initialValues = {
    user: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [stateVal, setStateVal]     = useState(initialValues);
  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Hooks
  useEffect(() => {
    setIsSubmitDisabled(stateVal.user && stateVal.password ? false : true)
  }, [stateVal]);

  // Handlers
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
    setFormErrors(formValidate(name, value));
  };
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsPasswordVisible(isPasswordVisible ? false : true);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append("user", formValues.user)
    fields.append("password", formValues.password)
    
    accountService.login(fields)
    .then(() => {
      // redirect
      navigate('/feed');
    })
    .catch((res) => {
      console.log(res);
    });
  };

  // Other functions
  const formValidate = (name, value) => {
    const errors = {...formErrors, [name]: ""};

    if(!value) {
      if(name === "user") {
        errors[name] = "Please type in a username or an email address";
      }
      else if(name === "password") {
        errors[name] = "Password is required";
      }
    }

    if(value && errors[name].length === 0) {
        setStateVal({...stateVal, [name]: true})
    }
    else {
        setStateVal({...stateVal, [name]: false})
    }

    return errors;
  };

  // Render
  return (
    <form className="form-container d-flex flex-column" onSubmit={handleSubmit} noValidate>
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">Login</h3>
          {/* Input user */}
          <div className="m-input-container mb-3">
            <label htmlFor="username" className="form-label">Username or email</label>
            <div className="m-input-group">
              <input 
                type="text"
                className="form-control" 
                id="inputUser"
                name="user"
                value={formValues.user} 
                onChange={handleChange} 
                autoFocus={true}
              />
            </div>
          </div>
          {/* Input password */}
          <div className="m-input-container mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="m-input-group">
              <input 
                type={isPasswordVisible ? "text" : "password"}
                className="form-control" 
                id="inputPassword" 
                name="password"
                value={formValues.password} 
                onChange={handleChange} 
              />
              <button className="btn position-absolute m-toggle-password" type="button" id="button-addon2" tabIndex="-1" onMouseDown={handleMouseDown}>
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn m-btn m-btn-green" name="submit" disabled={isSubmitDisabled}>
        <FontAwesomeIcon icon={faArrowRight} />          
      </button>
    </form>
  );
};

export { Login };
