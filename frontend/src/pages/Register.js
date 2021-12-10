import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
        maxLenght: 64,
        // no whitespaces
        // 1 upper- and lowercase char
        // 1 number
        // 1 speacial char
        regex: /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:]).+$/
    },
}

// TODO start page in input field
// TODO if username already exists
// TODO if email is already registered
// TODO password tip
// TODO popup you signed in successfully. we ve send you an email to verficate your account

const Register = (props) => {
    
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        terms: false
    };
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [stateVal, setStateVal] = useState(initialValues);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(stateVal.username && stateVal.email && stateVal.password && stateVal.terms ? false : true)
    }, [stateVal]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === "terms") {
            setFormValues({...formValues, [name]: !formValues.terms});
        } else {
            setFormValues({...formValues, [name]: value}); 
        }

        setFormErrors(formValidate(name, value));
    };

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
                        <h3 className="text-center">Sign in</h3>
                        <FormInput
                            type="text"
                            id="inputUsername"
                            name="username"
                            label="Username"
                            value={formValues.username}
                            errors={formErrors.username}
                            onChange={handleChange}
                            focus={true}
                        />
                        <FormInput
                            type="email"
                            id="inputEmail"
                            name="email"
                            label="Email address"
                            value={formValues.email}
                            errors={formErrors.email}
                            onChange={handleChange}
                        />
                        <FormInput
                            type="password"
                            id="inputPassword"
                            name="password"
                            label="Password"
                            value={formValues.password}
                            errors={formErrors.password}
                            onChange={handleChange}
                        />
                        <FormInput
                            type="checkbox"
                            id="checkTerms"
                            name="terms"
                            label="I accept our Terms of Use & Privacy Policy"
                            value={formValues.terms}
                            errors={formErrors.terms}
                            onChange={handleChange}
                        />
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
