// TODO if username already exists
// TODO if email is already registered
// TODO Email verification
// TODO Alerts on registration success and fail

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { accountService } from '../_services';
import { Tooltip } from "../_components";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
    
  const [formValues, setFormValues]   = useState(initialValues);
  const [formErrors, setFormErrors]   = useState(initialValues);
  const [stateVal, setStateVal]       = useState(initialValues);
  const [isFocus, setIsFocus]         = useState(initialValues);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setIsSubmitDisabled(stateVal.username && stateVal.email && stateVal.password ? false : true)
  }, [stateVal]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
    setFormErrors(formValidate(name, value));
  };

  const handleBlur = (e) => {
    setIsFocus({[e.target.name]: false});
  };
  
  const handleFocus = (e) => {
    const {name, value} = e.target;
    setIsFocus({[name]: true});
    setFormValues({...formValues, [name]: value}); 
    setFormErrors(formValidate(name, value));
  };

  const handleMouseDown = (e) => {
    // keeps focus on input
    e.preventDefault();
    setIsPasswordVisible(isPasswordVisible ? false : true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fields = new FormData();
    fields.append("username", formValues.username)
    fields.append("email", formValues.email)
    fields.append("password", formValues.password)
    
    accountService.register(fields)
    .then(() => {
      navigate('/account/login');
    })
    .catch((res) => {
      console.log(res);
    });
  };

  const formValidate = (name, value) => {
    const passwordMinLenght = 8;
    const usernameMinLenght = 3;
    const usernameMaxLenght = 16;

    const regexEmail    = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexUsername = /[^A-Za-z0-9]+/;

    let errors = {...formErrors, [name]: []};

    switch (name) {
      case "username":
        if (!value) {
          errors[name] = "Please type in a username";
        }
        else if (value.length < usernameMinLenght) {
          errors[name] = `Username is too short`;
        }
        else if (value.length > usernameMaxLenght) {
          errors[name] = `Username is too long`;
        }
        else if (regexUsername.test(value)) {
          errors[name] = "Use only letters or numbers";
        }
        break;

      case "email":
        if (!value) {
          errors[name] = "Please type in an email";
        } 
        else if (!regexEmail.test(value)) {
          errors[name] = "Email is invalid";
        }
        break;

      case "password":
        if (!value) {
          errors[name].push("empty");
        } 
        if (value.length < passwordMinLenght) {
          errors[name].push("lenght");
        }
        if (!value.match(/\d/)) {
          errors[name].push("number");
        }
        if (!value.match(/\W/)) {
          errors[name].push("special");
        }
        if (!value.match(/[A-Z]/) || !value.match(/[a-z]/)) {
          errors[name].push("letter");
        }
        break;
      default:
        break;
    }

    if(value && errors[name].length === 0) {
      setStateVal({...stateVal, [name]: true})
    }
    else {
      setStateVal({...stateVal, [name]: false})
    }

    return errors;
  };

  return (
    <form className="d-flex flex-column m-auto" onSubmit={handleSubmit} noValidate>
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">Sign Up</h3>
          {/* Input username */}          
          <div className="m-input-container mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="m-input-group">
              <input 
                type="text"
                className={`form-control ${formErrors.username.length > 0 && !isFocus.username ? "is-invalid" : ""}`} 
                id="inputUsername" 
                name="username"
                value={formValues.username} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                onFocus={handleFocus} 
                autoFocus={true}
              />
              <Tooltip fieldName="username" message={
                <p className="mb-0">use 3-16 characters &<br />only letters or numbers</p>} 
              />
              {formErrors.username.length > 0 && !isFocus.username && <div className="invalid-feedback">{formErrors.username}</div>}
            </div>
          </div>
          {/* Input emial */}
          <div className="m-input-container mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="m-input-group">
              <input 
                type="email"
                className={`form-control ${formErrors.email.length > 0 && !isFocus.email ? "is-invalid" : ""}`} 
                id="inputEmail" 
                name="email"
                value={formValues.email} 
                onChange={handleChange} 
                onBlur={handleBlur}
                onFocus={handleFocus} 
              />
              {formErrors.email.length > 0 && !isFocus.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>
          </div>
          {/* Input password */}
          <div className="m-input-container mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="m-input-group">
              <input 
                type={isPasswordVisible ? "text" : "password"}
                className={`form-control ${Object.keys(formErrors.password).length > 0 && !isFocus.password ? "is-invalid" : ""}`} 
                id="inputPassword" 
                name="password"
                value={formValues.password} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                onFocus={handleFocus} 
              />
              <button 
                className="btn position-absolute m-toggle-password" 
                type="button" 
                id="button-addon2"
                tabIndex="-1"
                onMouseDown={handleMouseDown}
              >
                <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
              </button>
              {Object.keys(formErrors.password).length > 0 && 
              <Tooltip fieldName="password" message={
                <ul className="list-group">
                  <li className={`${!formErrors.password.includes("lenght")    ? "valid" : ""}`}>• Use 8 or more characters</li>
                  <li className={`${!formErrors.password.includes("letter")    ? "valid" : ""}`}>• Use upper and lower case characters</li>
                  <li className={`${!formErrors.password.includes("number")    ? "valid" : ""}`}>• Use a number</li>
                  <li className={`${!formErrors.password.includes("special")   ? "valid" : ""}`}>• Use a speacial character</li>
                </ul>} 
              />}
              <div className="invalid-feedback">{`${formErrors.password.includes("empty") ? "Please type in a password" : "Password is invalid"}`}</div>
            </div>
          </div>
          <p className="m-terms text-center"><small>By signing up you agree to our <br /><a href="/">Terms of Use</a> & <a href="/">Privacy Policy</a>.</small></p>
        </div>
      </div>
      <button type="submit" className="btn m-btn m-btn-green" name="submit" disabled={isSubmitDisabled}>
        <FontAwesomeIcon icon={faArrowRight} />          
      </button>
    </form>
  );
};

export { Register };
