import React, { useState } from 'react';

import Router from './components/routing/Router';
import { UserContext } from './context/UserContext';
import { SubmitContext } from './context/SubmitContext';

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/Styles';

const App = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
  const [ isSubmit, setIsSubmit ] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>    
        <SubmitContext.Provider value={{ isSubmit, setIsSubmit }}>
          <Router />
        </SubmitContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
