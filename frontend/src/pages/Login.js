import React, { useState, useEffect } from "react";

import { accountService } from '../_services';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = (props) => {
  const initialValues = {
    user: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [stateVal, setStateVal]     = useState(initialValues);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(stateVal.user && stateVal.password ? false : true)
  }, [stateVal]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
    setFormErrors(formValidate(name, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append("user", formValues.user)
    fields.append("password", formValues.password)
    
    accountService.login(fields)
    .then(() => {
      console.log("yaaaaaaaay");
    })
    .catch(function (res) {
      console.log(res);
    });
  };

  const handleMouseDown = (e) => {
    // keeps focus on input
    e.preventDefault();
    setIsPasswordVisible(isPasswordVisible ? false : true);
  }

  const formValidate = (name, value) => {
    const errors = {...formErrors, [name]: ""};

    switch (name) {
      case "user":
        if (!value) {
          errors[name] = "Please type in a username or an email address";
        }
        break;

      case "password":
        if (!value) {
            errors[name] = "Password is required";
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
    <div id="login-page" className="col align-self-center justify-self-center">
      {/* <div className="alert alert-success alert-dismissible fade show" role="alert">
        You signed up successfully.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> */}
      <form className="form-container d-flex flex-column" onSubmit={handleSubmit} noValidate>
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">Login</h3>
            <div className="m-input-container mb-3">
                {/* label */}
                <label htmlFor="username" className="form-label">Username</label>
                <div className="m-input-group">
                    {/* input */}
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
            <div className="m-input-container mb-3">
                {/* label */}
                <label htmlFor="password" className="form-label">Password</label>
                {/* input group */}
                <div className="m-input-group">
                    {/* input */}
                    <input 
                        type={isPasswordVisible ? "text" : "password"}
                        className="form-control" 
                        id="inputPassword" 
                        name="password"
                        value={formValues.password} 
                        onChange={handleChange} 
                    />
                    {/* input button */}
                    <button 
                        className="btn position-absolute m-toggle-password" 
                        type="button" 
                        id="button-addon2"
                        tabIndex="-1"
                        onMouseDown={handleMouseDown}
                    >
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                    </button>
                    {/* errors */}
                    <div className="invalid-feedback">{`${formErrors.password.includes("empty") ? "Please type in a password" : "Password is invalid"}`}</div>
                </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn m-btn m-btn-green" name="submit" disabled={isButtonDisabled}>
          <FontAwesomeIcon icon={faArrowRight} />          
        </button>
      </form>
    </div>
  );
};

export default Login;
