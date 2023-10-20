import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';

export const StyledPaper = styled(Paper)(() => ({
  padding: '16px',
  maxWidth: '400px',
  margin: '0 auto',
}));

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

export const StyledInput = styled(TextField)(() => ({
  width: '100%',
}));

export const StyledButton = styled(Button)(() => ({
  marginTop: '16px',
}));

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ShakeButton = styled(Button)({
  animation: 'shake .25s', // Shake for 1 second
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate(-5px, 0)', // Adjust the distance and direction of the shake
    },
    '20%, 80%': {
      transform: 'translate(5px, 0)', // Adjust the distance and direction of the shake
    },
    '30%, 50%, 70%': {
      transform: 'translate(-5px, 0)', // Adjust the distance and direction of the shake
    },
    '40%, 60%': {
      transform: 'translate(5px, 0)', // Adjust the distance and direction of the shake
    },
  },
});