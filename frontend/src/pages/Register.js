import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { accountService } from '../_services';
import { FormField, FormTooltip, FormErrors } from '../_components/Form'
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// TODO if username already exists
// TODO if email is already registered
// TODO Email verification
// TODO Alerts on registration success and fail

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const fields = new FormData();
        fields.append("username", formValues.username)
        fields.append("email", formValues.email)
        fields.append("password", formValues.password)
        
        accountService.register(fields)
        .then(() => {
            navigate('/login');
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
        <div id="register-page" className="col align-self-center justify-self-center">
            <form className="d-flex flex-column m-auto" onSubmit={handleSubmit} noValidate>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">Sign Up</h3>
                        <div className="m-input-container mb-3">
                            <label htmlFor="inputUsername" className="form-label">Username</label>
                            <div className="m-input-group">
                                <FormField 
                                    fieldName="username"
                                    type="text"
                                    id="inputUsername" 
                                    className={`${formErrors.username.length > 0 && !isFocus.username ? "is-invalid" : ""}`} 
                                    value={formValues.username} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    autoFocus={true}
                                />
                                <FormTooltip 
                                    fieldName="username" 
                                    message={<p className="mb-0">use 3-16 characters &<br />only letters or numbers</p>} 
                                />
                                <FormErrors fieldName="username" errors={formErrors.username} fieldFocus={isFocus} />
                            </div>
                        </div>
                        <div className="m-input-container mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <div className="m-input-group">
                                <FormField 
                                    fieldName="email"
                                    type="email"
                                    id="inputEmail" 
                                    className={`${formErrors.email.length > 0 && !isFocus.email ? "is-invalid" : ""}`} 
                                    value={formValues.email} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                />
                                <FormErrors fieldName="email" errors={formErrors.email} fieldFocus={isFocus} />
                            </div>
                        </div>
                        <div className="m-input-container mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <div className="m-input-group">
                                <FormField 
                                    fieldName="password"
                                    type="password"
                                    id="inputPassword" 
                                    className={`${Object.keys(formErrors.password).length > 0 && !isFocus.password ? "is-invalid" : ""}`} 
                                    value={formValues.password} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                />
                                {Object.keys(formErrors.password).length > 0 &&    
                                <FormTooltip 
                                    fieldName="password" 
                                    message={
                                        <ul className="list-group">
                                            <li className={`${!formErrors.password.includes("lenght")    ? "valid" : ""}`}>• Use 8 or more characters</li>
                                            <li className={`${!formErrors.password.includes("letter")    ? "valid" : ""}`}>• Use upper and lower case characters</li>
                                            <li className={`${!formErrors.password.includes("number")    ? "valid" : ""}`}>• Use a number</li>
                                            <li className={`${!formErrors.password.includes("special")   ? "valid" : ""}`}>• Use a speacial character</li>
                                        </ul>
                                    } 
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
        </div>
    );
};

export default Register;
