import React from 'react';
import NavMain from './components/menus/NavMain';
import Router from './Router';

const App = () => {
  return (
    <>
      <header>
        <NavMain />
      </header>
      <main id="main">
        <Router />
      </main>
    </>
  );
};

export default App;
