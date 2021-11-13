import React from 'react';
import LoginForm from '../components/home/LoginForm'

const HomePage = (props) => {
  // const {} = props;
  return (
    <section className="section-home">
      <div className="container">
        <h1>Home</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default HomePage;
