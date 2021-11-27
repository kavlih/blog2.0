import React from 'react';
import NavMain from './components/menus/NavMain';
import Router from './Router';

const App = () => {
  return (
    <>
        <header id="header">
          <NavMain />
        </header>
        <main id="main">
          <div className="container-fluid h-100 d-flex">
            <Router />
          </div>
        </main>
    </>
  );
};

export default App;
