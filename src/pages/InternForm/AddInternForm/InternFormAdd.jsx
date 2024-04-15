import { CircularProgress, Container, Step, StepLabel, Stepper } from '@mui/material';
import CompanyInfoAdd from './CompanyInfoAdd';
import StudentInfoAdd from './StudentInfoAdd';
import FormAdd from './FormAdd';
import { useState } from 'react';

function InternFormAdd() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Container>
      <Stepper activeStep={step - 1} alternativeLabel>
        <Step>
          <StepLabel>Staj Formu Bilgileri</StepLabel>
        </Step>
        <Step>
          <StepLabel>Öğrenci Bilgileri</StepLabel>
        </Step>
        <Step>
          <StepLabel>Şirket Bilgileri</StepLabel>
        </Step>
      </Stepper>
      {isLoading && <CircularProgress />}
      {step === 1 && <FormAdd nextStep={nextStep} setIsLoading={(e) => setIsLoading(e)} />}
      {step === 2 && <StudentInfoAdd nextStep={nextStep} prevStep={prevStep} setIsLoading={(e) => setIsLoading(e)} />}
      {step === 3 && <CompanyInfoAdd nextStep={nextStep} prevStep={prevStep} setIsLoading={(e) => setIsLoading(e)} />}
    </Container>
  );
}

export default InternFormAdd;
