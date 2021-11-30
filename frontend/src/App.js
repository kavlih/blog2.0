import React from 'react';
import NavMain from './components/menus/NavMain';
import Router from './Router';

const App = () => {
  return (
    <div id="wrapper" className="d-flex flex-column h-100 w-100">
      <NavMain />
      <main id="main">
        <div className="container-fluid h-100 d-flex">
          <Router />
        </div>
      </main>
    </div>
  );
};

export default App;
