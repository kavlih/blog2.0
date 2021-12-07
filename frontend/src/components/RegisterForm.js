import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const baseURL = "http://localhost:8888/index.php?_url=";

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

// const FormErrors = ({formErrors}) => {
//   <div className="invalid-feedback">
//     {Object.keys(formErrors).map((fieldName, i) => {
//       if(formErrors[fieldName].length > 0){
//         return (
//           <p key={i}>{fieldName} {formErrors[fieldName]}</p>
//         )        
//       } else {
//         return '';
//       }
//     })}
//   </div>
// }

const RegisterForm = (props) => {

const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',  
        // terms: false
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        Object.entries(formValues).map((input) => {
            setFormErrors(formValidate(input[0], input[1]));
        })

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
        // ...formValues -> gets initial states
        setFormValues({...formValues, [name]: value});
    };

    const handleBlur = (e) => {
        setFormErrors(formValidate(e.target.name, e.target.value));
    };

    // useEffect(() => {
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         // console.log(formValues);
    //     }
    // }, [formErrors]);

    const formValidate = (key, value) => {

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexUsername = /[^A-Za-z0-9]+/;
        const errors = {};

        switch (key) {
            case "username":
                if (!value) {
                    errors.username = "Please type in a username";
                    // setFormErrors({"username": "Please type in a username"})
                } else {
                    if (value.length < formSettings.username.minLenght) {
                    errors.username = `Username requires minimum ${formSettings.username.minLenght} characters`;
                    }
                    if (value.length > formSettings.username.maxLenght) {
                    errors.username = `Username should be maximum ${formSettings.username.maxLenght} characters`;
                    }
                    if (regexUsername.test(value)) {
                    errors.username = "Use only letters or numbers";
                    }
                }
                break;
            case "email":
                if (!value) {
                    errors.email = "Please type in an email";
                } else if (!regexEmail.test(value)) {
                    errors.email = "Email is invalid";
                }
                break;
            case "password":
                if (!value) {
                    errors.password = "Password is required";
                }
                break;
            case "passwordRepeat":
                if (!value) {
                    errors.passwordRepeat = "Repeat your password";
                }
                break;
        }

        console.log(errors);
        return errors;
    };

    return (
        <div id="register-page" className="col align-self-center justify-self-center">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="">success</div>
            ) : (
                <div className="">not successful</div>
            )}
            <form className="form-container d-flex flex-column m-auto" onSubmit={handleSubmit} noValidate>
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-center">register</h3>
                        <div className="mb-3">
                            <label htmlFor="InputUsername" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className={`form-control ${typeof(formErrors.username) != "undefined" ? "is-invalid" : ""}`} 
                                id="InputUsername" name="username" 
                                value={formValues.username} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                            />
                            {typeof(formErrors.username) != "undefined" && (
                                <div className="invalid-feedback">{formErrors.username}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className={`form-control ${typeof(formErrors.email) != "undefined" ? "is-invalid" : ""}`} 
                                id="inputEmail" 
                                name="email" 
                                value={formValues.email} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                            />
                            {typeof(formErrors.email) != "undefined" && (
                                <div className="invalid-feedback">{formErrors.email}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className={typeof(formErrors.password) != "undefined" ? "is-invalid form-control" : "form-control"} 
                                id="inputPassword" 
                                name="password" 
                                value={formValues.password} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                            />
                            {typeof(formErrors.password) != "undefined" && (
                                <div className="invalid-feedback">{formErrors.password}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPasswordRepeat" className="form-label">Password repeat</label>
                            <input 
                                type="password" 
                                className={typeof(formErrors.passwordRepeat) != "undefined" ? "is-invalid form-control" : "form-control"} 
                                id="inputPasswordRepeat" 
                                name="passwordRepeat" 
                                value={formValues.passwordRepeat} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {typeof(formErrors.passwordRepeat) != "undefined" && (
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
                <button type="submit" className="btn btn-primary-circle" name="submit">
                <FontAwesomeIcon icon={faArrowRight} />          
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
