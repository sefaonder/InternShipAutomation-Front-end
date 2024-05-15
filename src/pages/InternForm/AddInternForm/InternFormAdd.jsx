import { Backdrop, CircularProgress, Container, Step, StepLabel, Stepper } from '@mui/material';
import CompanyInfoAdd from './CompanyInfoAdd';
import StudentInfoAdd from './StudentInfoAdd';
import FormAdd from './FormAdd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearInternFormData } from 'src/store/services/internForm/internFormSlice';

function InternFormAdd() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { internFormId } = useParams();

  const internForm = useSelector((state) => state.internForm);

  console.log('hibili', internForm);

  useEffect(() => {
    if (internFormId && !Boolean(internForm?.id)) {
      // navigate back detail page
      navigate('/intern-form/' + internFormId);
    }

    if (!internFormId) {
      dispatch(clearInternFormData());
    }
  }, []);

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
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {step === 1 && <FormAdd internFormData={internForm} nextStep={nextStep} setIsLoading={(e) => setIsLoading(e)} />}
      {step === 2 && (
        <StudentInfoAdd
          internFormData={internForm}
          nextStep={nextStep}
          prevStep={prevStep}
          setIsLoading={(e) => setIsLoading(e)}
        />
      )}
      {step === 3 && (
        <CompanyInfoAdd
          internFormData={internForm}
          nextStep={nextStep}
          prevStep={prevStep}
          setIsLoading={(e) => setIsLoading(e)}
        />
      )}
    </Container>
  );
}

export default InternFormAdd;
