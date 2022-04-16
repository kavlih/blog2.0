import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
  
const PostButton = styled(Button)(() => ({  
  border: 'none',
  fontSize: 'small',
  padding: 0,
  minWidth: 'unset',
  '& .MuiButton-startIcon': {
    marginRight: '4px'
  },
  '& .MuiButton-endIcon': {
    marginLeft: '2px'
  },
}));

export default PostButton;