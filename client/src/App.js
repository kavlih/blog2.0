import React, { useState } from 'react';

import Router from './components/routing/Router';
import { UserContext } from './context/UserContext';
import { SubmitContext } from './context/SubmitContext';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import theme from './styles/Styles';

const App = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
  const [ isUpdatedPost, setIsUpdatedPost ] = useState(1);
  const [ isUpdatedUser, setIsUpdatedUser ] = useState(1);
  const [light, setLight] = useState(false);

  return (
    <ThemeProvider theme={light ? theme : theme}>
      <UserContext.Provider value={{ user, setUser }}>    
        <SubmitContext.Provider value={{ isUpdatedPost, setIsUpdatedPost, isUpdatedUser, setIsUpdatedUser }}>
          <CssBaseline />
          <Router />
        </SubmitContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
