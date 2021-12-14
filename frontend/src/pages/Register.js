import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-regular-svg-icons";

import FormInput from '../components/FormInput';

const baseURL = "http://localhost:8888/index.php?_url=";

const formSettings = {
    username: {
        minLenght: 3,
        maxLenght: 16,
        // only numbers and letters
        regex: /[^A-Za-z0-9]+/
    },
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        minLenght: 8,
        // no whitespaces
        // 1 upper- and lowercase char
        // 1 number
        // 1 speacial char
        regex: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:]).+$/
    },
}

// TODO if username already exists
// TODO if email is already registered
// TODO Email verification

const Register = (props) => {
    
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

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(stateVal.username && stateVal.email && stateVal.password ? false : true)
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

        setIsSubmit(true);

        if(isSubmit) {
            const registerData = new FormData();
            registerData.append("username", formValues.username)
            registerData.append("email", formValues.email)
            registerData.append("password", formValues.password)
            
            // for (var pair of registerData.entries()) {
            //   console.log(pair[0]+ ', ' + pair[1]); 
            // }
            
            axios({
                method: "post",
                url: baseURL + "userservice/register",
                data: registerData,
                headers: { 
                "Content-Type": "multipart/form-data"
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/login");
                }
            })
            .catch(function (res) {
                // handle error
                console.log(res);
            });
        }
    };

    const formValidate = (name, value) => {
        const regexEmail    = formSettings.email.regex;
        const regexUsername = formSettings.username.regex;
        const regexPassword = formSettings.password.regex;

        let errors = {...formErrors, [name]: []};

        switch (name) {
            case "username":
                if (!value) {
                    errors[name] = "Please type in a username";
                }
                else if (value.length < formSettings.username.minLenght || value.length > formSettings.username.maxLenght) {
                    errors[name] = `Username has to be ${formSettings.username.minLenght}-${formSettings.username.maxLenght} characters long`;
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
                if (value.length < formSettings.password.minLenght) {
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
        <div id="register-page" className="col align-self-center justify-self-center">
            <form className="d-flex flex-column m-auto" onSubmit={handleSubmit} noValidate>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">Sign Up</h3>
                        <div className="m-input-container mb-3">
                            {/* label */}
                            <label htmlFor="username" className="form-label mb-0">Username</label>
                            {/* info */}
                            <small>
                                <p className="m-info mb-2">{`${formSettings.username.minLenght}-${formSettings.username.maxLenght} characters. Only letters or numbers`}</p>
                            </small>
                            {/* input group */}
                            <div className="m-input-group">
                                {/* input */}
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
                                {/* errors */}
                                {formErrors.username.length > 0 && !isFocus.username && <div className="invalid-feedback">{formErrors.username}</div>}
                            </div>
                        </div>
                        <div className="m-input-container mb-3">
                            {/* label */}
                            <label htmlFor="email" className="form-label">Email</label>
                            {/* input group */}
                            <div className="m-input-group">
                                {/* input */}
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
                                {/* errors */}
                                {formErrors.email.length > 0 && !isFocus.email && <div className="invalid-feedback">{formErrors.email}</div>}
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
                                    className={`form-control ${Object.keys(formErrors.password).length > 0 && !isFocus.password ? "is-invalid" : ""}`} 
                                    id="inputPassword" 
                                    name="password"
                                    value={formValues.password} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
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
                                {Object.keys(formErrors.password).length > 0 && <small className="m-password-conditions">
                                    <ul className="list-group">
                                        <li className={`${!formErrors.password.includes("lenght")    ? "valid" : ""}`}>• Use 8 or more characters</li>
                                        <li className={`${!formErrors.password.includes("letter")    ? "valid" : ""}`}>• Use upper and lower case characters</li>
                                        <li className={`${!formErrors.password.includes("number")    ? "valid" : ""}`}>• Use a number</li>
                                        <li className={`${!formErrors.password.includes("special")   ? "valid" : ""}`}>• Use a speacial character</li>
                                    </ul>
                                </small>}
                                <div className="invalid-feedback">{`${formErrors.password.includes("empty") ? "Please type in a password" : "Password is invalid"}`}</div>
                            </div>
                        </div>
                        <p className="m-terms text-center"><small>By signing up you agree to our <br /><a href="/">Terms of Use</a> & <a href="/">Privacy Policy</a>.</small></p>
                    </div>
                </div>
                <button type="submit" className="btn m-btn m-btn-green" name="submit" disabled={isButtonDisabled}>
                    <FontAwesomeIcon icon={faArrowRight} />          
                </button>
            </form>
        </div>
    );
};

export default Register;
