// import React from 'react';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import { JourneyType } from '@this/types/Journey';

// const StyledPaper = styled(Paper)(() => ({
//   padding: '16px',
//   marginBottom: '16px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   textAlign: 'center',
//   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
// }));

// const StyledTypography = styled(Typography)(() => ({
//   fontWeight: 'bold',
//   marginBottom: '8px',
// }));

// interface JourneyItemProps {
//   journey: JourneyType;
// }

// const JourneyItem: React.FC<JourneyItemProps> = ({ journey }) => {
//   return (
//     <StyledPaper>
//       <StyledTypography variant="h6">{journey.name}</StyledTypography>
//       <img src={journey.img_url} alt={journey.name} style={{ maxWidth: '100%' }} />
//       <Typography>{journey.description}</Typography>
//       <Typography>Created on: {journey.created_at}</Typography>
//     </StyledPaper>
//   );
// };

// export default JourneyItem;