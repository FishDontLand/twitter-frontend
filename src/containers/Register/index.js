import Header from '@components/Header';
import { useState } from 'react';
import { registerUser } from '@services/register';
import { Toast } from 'antd-mobile';
import Show from '../../components/show/Show';
import FirstStepRegistration from './components/FirstStepRegistration';
import SecondStepRegistration from './components/SecondStepRegistration';

const STEP = {
  ONE: 1,
  TWO: 2,
};

const Register = () => {
  const [step, setStep] = useState(STEP.ONE);
  const [userInfo, setUserInfo] = useState({});

  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = async (password) => {
    const res = await registerUser({
      password,
      ...userInfo,
    });
    console.log(res);
    if (res.success) {
      Toast.show('Successfully registered');
      return;
    }
    Toast.show('Failed to register');
  };

  const onClickClose = () => {
    setStep(STEP.ONE);
  };

  return (
    <div>
      <Header onClickClose={onClickClose} />
      <Show visible={step === STEP.ONE}>
        <FirstStepRegistration gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO}>
        {step === STEP.TWO
      && (
      <SecondStepRegistration
        confirmRegisterHandler={confirmRegisterHandler}
        userInfo={userInfo}
      />
      )}
      </Show>
    </div>
  );
};

export default Register;
