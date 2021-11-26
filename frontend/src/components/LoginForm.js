import React from 'react';

const LoginForm = (props) => {
  return (
    <>
        <div className="form-container d-flex flex-column">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center">Welcome back</h2>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">stay logged in</label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-lg btn-primary mt-4">Submit</button>
            {/* <button type="submit" className="btn btn-lg btn-primary arrow mt-4" name="submit"><i className="fas fa-arrow-right"></i></button> */}
        </div>
    </>
  );
};

export default LoginForm;