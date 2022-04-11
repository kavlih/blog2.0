import React, { useState } from 'react';

import Router from './components/routing/Router';
import { UserContext } from './context/UserContext';

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/Styles';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>    
        <Router />
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
