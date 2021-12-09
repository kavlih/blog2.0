import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const baseURL = "http://localhost:8888/index.php?_url=";

// TODO if username already exists
// TODO if email is already registered

const RegisterForm = (props) => {
    
    const formSettings = {
        username: {
            minLenght: 3,
            maxLenght: 16,
            regex: /[^A-Za-z0-9]+/
        },
        email: {
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: {
            minLenght: 8,
            maxLenght: 64,
            regex: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:]).+$/
        },
    }

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        terms: false
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [stateVal, setStateVal] = useState(initialValues);

    const [isButtonDis, setIsButtonDis] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);

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

    useEffect(() => {
        setIsButtonDis(stateVal.username && stateVal.email && stateVal.password && stateVal.passwordRepeat && stateVal.terms ? false : true)
    }, [stateVal]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === "terms") {
            // setChecked(!checked);
            setFormValues({...formValues, [name]: !formValues.terms});
        } else {
            setFormValues({...formValues, [name]: value}); 
        }

        setFormErrors(formValidate(name, value));
    };

    const formValidate = (name, value) => {
        const regexEmail    = formSettings.email.regex;
        const regexUsername = formSettings.username.regex;
        const regexPassword = formSettings.password.regex;

        const errors = {...formErrors, [name]: ""};

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
                } else if (!regexEmail.test(value)) {
                    errors[name] = "Email is invalid";
                }
                break;

            case "password":
                if (!value) {
                    errors[name] = "Password is required";
                } 
                else if (value.length < formSettings.password.minLenght) {
                    errors[name] = `Password requires minimum ${formSettings.password.minLenght} characters`;
                }
                else if (value.length > formSettings.password.maxLenght) {
                    errors[name] = `Password should be maximum ${formSettings.password.maxLenght} characters long`;
                }
                else if (!regexPassword.test(value)) {
                    errors[name] = "Password is invalid";
                }
                break;

            case "passwordRepeat":
                if (!value) {
                    errors[name] = "Reapeat your password";
                } else if (value !== formValues.password) {
                    errors[name] = "Passwords do not match";
                }
                break;

            case "terms":
                if (formValues.terms) {
                    errors[name] = "Please accept our terms";
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
                            />
                            {formErrors.email.length > 0 && (
                                <div className="invalid-feedback">{formErrors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            {/* <div data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">Tooltip on top</div> */}
                            <input 
                                type="password" 
                                className={`form-control ${formErrors.password.length > 0 ? "is-invalid" : ""}`} 
                                id="inputPassword" 
                                name="password" 
                                value={formValues.password} 
                                onChange={handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <div className="invalid-feedback">{formErrors.password}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPasswordRepeat" className="form-label">Password repeat</label>
                            <input 
                                type="password" 
                                className={`form-control ${formErrors.passwordRepeat.length > 0 ? "is-invalid" : ""}`} 
                                id="inputPasswordRepeat" 
                                name="passwordRepeat" 
                                value={formValues.passwordRepeat} 
                                onChange={handleChange}
                            />
                            {formErrors.passwordRepeat.length > 0 && (
                                <div className="invalid-feedback">{formErrors.passwordRepeat}</div>
                            )}
                        </div>
                        <div className="mb-3 form-check">
                            <input 
                                type="checkbox" 
                                className={`form-check-input ${formErrors.terms.length > 0 ? "is-invalid" : ""}`} 
                                id="checkTerms"
                                name="terms"
                                checked={formValues.terms}
                                onChange={handleChange}
                                // value={formValues.passwordRepeat} 
                            />
                            <label htmlFor="checkTerms" className="form-check-label">I accept our <a href="/">Terms of Use</a> & <a href="/">Privacy Policy</a></label>
                            {formErrors.terms.length > 0 && (
                                <div className="invalid-feedback">{formErrors.terms}</div>
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn m-btn m-btn-green" name="submit" disabled={isButtonDis}>
                <FontAwesomeIcon icon={faArrowRight} />          
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
