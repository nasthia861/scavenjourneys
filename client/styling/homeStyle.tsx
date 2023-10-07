import { styled } from '@mui/material/styles';
import { Button, Paper } from '@mui/material';

export const StyledCreateJourneyButton = styled(Button)(() => ({
  backgroundColor: '#9a4119', // Change the background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b5870a', // Change the hover background color
  },
}));
