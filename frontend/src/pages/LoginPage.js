import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";



// const TogglePassword = (props) => {
//     const password = document.querySelector('#inputPassword');
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
          
//     password.setAttribute('type', type);

//     this.classList.toggle('bi-eye');
// };


const LoginPage = (props) => {
  // const {} = props;
  return (
    <div id="login-page" className="col align-self-center justify-self-center">
      <form className="form-container d-flex flex-column m-auto">
          <div className="card">
              <div className="card-body d-flex flex-column">
                  <h3 className="text-center">welcome back :)</h3>
                  <div className="mb-3">
                      <label for="inputUser" className="form-label">Email or username</label>
                      <input type="text" className="form-control" id="inputUser"/>
                  </div>
                  <div className="mb-3">
                      <label for="inputPassword" className="form-label">Password</label>
                      <div className="input-group">
                        <input type="password" className="form-control" id="inputPassword"/>
                        <button className="btn position-absolute togglePassword" type="button" id="button-addon2" disabled>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                  </div>
                  <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="checkLogin" disabled/>
                      <label className="form-check-label" for="checkLogin">stay logged in</label>
                  </div>
                  <a href="/" className="text-center">forgot your password?</a>
              </div>
          </div>
          <button type="submit" className="btn btn-primary-circle" name="submit">
            <FontAwesomeIcon icon={faArrowRight} />          
          </button>
      </form>
    </div>
  );
};

export default LoginPage;
