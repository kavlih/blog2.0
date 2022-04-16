import React, { useState, useEffect } from 'react';

import Router from './components/routing/Router';
import { UserContext } from './context/UserContext';
import { SubmitContext } from './context/SubmitContext';

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/Styles';

const App = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
  const [ isUpdatedPost, setIsUpdatedPost ] = useState(1);
  const [ isUpdatedUser, setIsUpdatedUser ] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>    
        <SubmitContext.Provider value={{ isUpdatedPost, setIsUpdatedPost, isUpdatedUser, setIsUpdatedUser }}>
          <Router />
        </SubmitContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
