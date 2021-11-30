import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";

const RegisterPage = (props) => {
  // const {} = props;
  return (
    <div id="register-page" className="col align-self-center justify-self-center">
      <form className="form-container d-flex flex-column m-auto">
          <div className="card">
              <div className="card-body">
                  <h3 className="text-center">register now</h3>
                  <div className="mb-3">
                      <label for="InputUsername" className="form-label">Username</label>
                      <input type="text" className="form-control" id="InputUsername" aria-describedby="usernameHelp"/>
                  </div>
                  <div className="mb-3">
                      <label for="inputEmail" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                      <label for="inputPassword" className="form-label">Password</label>
                      <input type="password" className="form-control" id="inputPassword"/>
                  </div>
                  <div className="mb-3">
                      <label for="inputPasswordRepeat" className="form-label">Password repeat</label>
                      <input type="password" className="form-control" id="inputPasswordRepeat"/>
                  </div>
                  <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" disabled/>
                      <label className="form-check-label" for="exampleCheck1">Accept our terms of service</label>
                  </div>
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
