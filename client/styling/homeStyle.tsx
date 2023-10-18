import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';

export const StyledCreateJourneyButton = styled(Button)(() => ({
  backgroundColor: '#9a4119', // Change the background color
  color: 'white',
  '&:hover': {
    backgroundColor: '#b5870a', // Change the hover background color
  },
}));
