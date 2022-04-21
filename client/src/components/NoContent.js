import React from 'react';
// MUI Components
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { ReactComponent as SnoopySleep } from '../assets/graphics/SnoopySleep.svg';

const Graphic = (props) => {
  return (
    <SvgIcon {...props}>
      <SnoopySleep />
    </SvgIcon>
  );
}

const NoContent = ({ headline }) => {
  return (
    <Stack
      alignItems='center'
      alignSelf='center'
      margin='auto'
      sx={{
        width: '100%',
        maxWidth: '300px',
      }}
    >
      <Graphic 
        sx={{
          width: '50%',
          height: '100%',
          color: 'primary.light'
        }}  
      />
      <Typography variant='h4'>
        {headline}
      </Typography>
    </Stack>
  );
};

export default NoContent;