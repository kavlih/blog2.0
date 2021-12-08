import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const baseURL = "http://localhost:8888/index.php?_url=";

const RegisterForm = (props) => {
    
    const formSettings = {
        username: {
            minLenght: 3,
            maxLenght: 16,
        },
        password: {
            minLenght: 8,
            maxLenght: 64,
        },
    }

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',  
        // terms: false
    };
   
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [stateVal, setStateVal] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        // TODO if setStateVal contains "" => add disabled to button, else if setStateVal contains only true => remove disabled from button
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Object.entries(formValues).map((input) => {
        //     setFormErrors(formValidate(input[0], input[1]));
        //     console.log(input);
        // })

        setIsSubmit(true);

        // // XMLHttpRequest
        // const registerFormValues = new FormValues();
        // registerFormValues.append("username", formvalue)
        // registerFormValues.append("email", formvalue)
        // registerFormValues.append("password", formValues.password)
        // registerFormValues.append("passwordRepeat", formValues.passwordRepeat)
        
        // // for (var pair of registerFormValues.entries()) {
        // //   console.log(pair[0]+ ', ' + pair[1]); 
        // // }
        
        // axios({
        //     method: "post",
        //     url: baseURL + "userservice/register",
        //     data: registerFormValues,
        //     headers: { 
        //     "Content-Type": "multipart/form-data"
        //     },
        // })
        // .then(function (res) {
        //     // handle success
        //     console.log(res);
        // })
        // .catch(function (res) {
        //     // handle error
        //     console.log(res);
        // });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        setFormErrors({...formErrors, [name]: []})
        setStateVal({...stateVal, [name]: ""});
    };

    const handleBlur = (e) => {
        e.preventDefault();
        setFormErrors(formValidate(e.target.name, e.target.value));
    };

    const formValidate = (key, value) => {

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexUsername = /[^A-Za-z0-9]+/;
        const errors = {...formErrors};

        errors[key] = [];

        switch (key) {
            case "username":
                if (!value) {
                    errors[key].push("Please type in a username");
                } else {
                    if (value.length < formSettings.username.minLenght) {
                    errors[key].push(`Username requires minimum ${formSettings.username.minLenght} characters`);
                    }
                    if (value.length > formSettings.username.maxLenght) {
                    errors[key].push(`Username should be maximum ${formSettings.username.maxLenght} characters`);
                    }
                    if (regexUsername.test(value)) {
                    errors[key].push("Use only letters or numbers");
                    }
                }
                break;
            case "email":
                if (!value) {
                    errors[key] = "Please type in an email";
                } else if (!regexEmail.test(value)) {
                    errors[key] = "Email is invalid";
                }
                break;
            case "password":
                if (!value) {
                    errors[key] = "Password is required";
                }
                break;
            case "passwordRepeat":
                if (!value) {
                    errors[key] = "Repeat your password";
                }
                break;
        }

        if(value && errors[key].length === 0) {
            setStateVal({...stateVal, [key]: true})
        }

        return errors;
    };

    return (
        <div id="register-page" className="col align-self-center justify-self-center">
            <form className="form-container d-flex flex-column m-auto" onSubmit={handleSubmit} noValidate>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">register</h3>
                        <div className="mb-3">
                            <label htmlFor="InputUsername" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className={`form-control ${formErrors.username.length > 0 ? "is-invalid" : ""}`} 
                                id="InputUsername" name="username" 
                                value={formValues.username} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                            />
                            {formErrors.username.length > 0 && (
                                <div className="invalid-feedback">{formErrors.username}</div>
                            )}
                            {/* {formErrors.username.map((e) => {
                                <div className="invalid-feedback">{e}</div>
                            })} */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className={`form-control ${formErrors.email.length > 0 ? "is-invalid" : ""}`} 
                                id="inputEmail" 
                                name="email" 
                                value={formValues.email} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                            />
                            {formErrors.email.length > 0 && (
                                <div className="invalid-feedback">{formErrors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className={formErrors.password.length > 0 ? "is-invalid form-control" : "form-control"} 
                                id="inputPassword" 
                                name="password" 
                                value={formValues.password} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                            />
                            {formErrors.password.length > 0 && (
                                <div className="invalid-feedback">{formErrors.password}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPasswordRepeat" className="form-label">Password repeat</label>
                            <input 
                                type="password" 
                                className={formErrors.passwordRepeat.length > 0 ? "is-invalid form-control" : "form-control"} 
                                id="inputPasswordRepeat" 
                                name="passwordRepeat" 
                                value={formValues.passwordRepeat} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {formErrors.passwordRepeat.length > 0 && (
                                <div className="invalid-feedback">{formErrors.passwordRepeat}</div>
                            )}
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="checkTerms"/>
                            <label className="form-check-label" htmlFor="checkTerms" name="terms">I accept our <a href="/">Terms of Use</a> & <a href="/">Privacy Policy</a></label>
                            {typeof(formErrors.terms) != "undefined" && (
                                <div className="invalid-feedback">{formErrors.passwordRepeat}</div>
                            )}
                        </div> */}
                    </div>
                </div>
                <button type="submit" className="btn m-btn m-btn-green" name="submit">
                <FontAwesomeIcon icon={faArrowRight} />          
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
