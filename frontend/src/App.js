import React from 'react';
import Nav from './_components/Nav';
import Router from './Router';

const App = () => {
  return (
    <div id="wrapper" className="d-flex flex-column h-100 w-100">
      <Nav />
      <main>
        <div className="container-fluid h-100 d-flex">
          <Router />
        </div>
      </main>
    </div>
  );
};

export default App;
