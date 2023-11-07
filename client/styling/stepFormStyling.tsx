import Button from '@mui/material/Button';
import styled from '@mui/system/styled'

export const ShakeButton = styled(Button)({
  animation: 'shake .5s', // Shake for 1 second
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