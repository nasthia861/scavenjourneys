import React from 'react';
import { StepProgressType } from '@this/types/StepProgress';


type IHeaderProps = {
  step: StepProgressType
};

const StepProgress: React.FC<IHeaderProps> = ({ step }) => {
  return (
    <div>{step.step.name}</div>
  );
};

export default StepProgress;