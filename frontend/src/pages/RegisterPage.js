import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const url = "http://localhost:8888/index.php?_url=userservice/register";

const RegisterPage = (props) => {

  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    terms: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const registerFormData = new FormData();
    registerFormData.append("username", formData.username)
    registerFormData.append("email", formData.email)
    registerFormData.append("password", formData.password)
    registerFormData.append("passwordRepeat", formData.passwordRepeat)
    
    // console log registerFormData
    for (var pair of registerFormData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    

    axios({
      method: "post",
      url: url,
      data: registerFormData,
      headers: { 
        "Content-Type": "multipart/form-data"
      },
    })
      .then(function (res) {
        //handle success
        console.log(res);
      })
      .catch(function (res) {
        //handle error
        console.log(res);
      });
  }

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div id="register-page" className="col align-self-center justify-self-center">
      <form className="form-container d-flex flex-column m-auto" onSubmit={handleSubmit}>
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">register</h3>
                <div className="mb-3">
                    <label htmlFor="InputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="InputUsername" name="username" value={formData.username} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPasswordRepeat" className="form-label">Password repeat</label>
                    <input type="password" className="form-control" id="inputPasswordRepeat" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange}/>
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkTerms"/>
                    <label className="form-check-label" htmlFor="checkTerms" name="terms">I accept our <a href="/">Terms of Use</a> & <a href="/">Privacy Policy</a></label>
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

export default RegisterPage;
