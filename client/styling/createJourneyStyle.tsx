import {Button, TextField, Paper} from '@mui/material';
import { styled } from '@mui/material/styles';

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