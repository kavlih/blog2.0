import React from 'react';

const RegisterPage = (props) => {
  // const {} = props;
  return (
    <section id="section-register" className="col align-self-center justify-self-center">
      <form className="form-container d-flex flex-column m-auto">
          <div className="card">
              <div className="card-body">
                  <h2 className="text-center">Register</h2>
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
              </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary mt-4">Submit</button>
          {/* <button type="submit" className="btn btn-lg btn-primary arrow mt-4" name="submit"><i className="fas fa-arrow-right"></i></button> */}
      </form>
    </section>
  );
};

export default RegisterPage;
