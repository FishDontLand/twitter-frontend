import Header from '@components/Header';
import { useState } from 'react';
import FirstStepRegistration from './components/FirstStepRegistration';
import SecondStepRegistration from './components/SecondStepRegistration';

const STEP = {
  ONE: 1,
  TWO: 2,
};

const Register = () => {
  const [step, setStep] = useState(STEP.ONE);
  const [userInfo, setUserInfo] = useState();

  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = (password) => {
    console.log({
      password,
      ...userInfo,
    });
  };

  return (
    <div>
      <Header />
      {step === STEP.ONE && <FirstStepRegistration gotoNextStepHandler={gotoNextStepHandler} />}
      {step === STEP.TWO
      && (
      <SecondStepRegistration
        confirmRegisterHandler={confirmRegisterHandler}
        userInfo={userInfo}
      />
      )}
    </div>
  );
};

export default Register;
