import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = (props) => {
  // const {} = props;
  return (
    <section className="section-home">
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
