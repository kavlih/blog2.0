import React, { useState } from 'react';

import Router from './components/routing/Router';
import { UserContext } from './context/UserContext';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <UserContext.Provider value={{ user, setUser }}>    
        <div id="wrapper">
          <Router />
        </div>
    </UserContext.Provider>
  );
};

export default App;
