import React, { useState } from 'react';

import { Nav, Router, UserContext } from './_components';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <UserContext.Provider value={{ user, setUser }}>    
      <div id="wrapper" className="d-flex flex-column h-100 w-100">
        <Nav />
        <main className="container-fluid h-100 d-flex">
          <Router />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export { App };
