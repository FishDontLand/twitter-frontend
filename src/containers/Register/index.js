import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@services/register';
import { Toast } from 'antd-mobile';
import { useAppContext } from '@utils/context';
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
  const [, setStore] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === STEP.ONE) {
      setStore({
        closeHeaderHandler: () => navigate('/login'),
      });
    }
    if (step === STEP.TWO) {
      setStore({
        closeHeaderHandler: () => setStep(STEP.ONE),
      });
    }
  }, [step]);

  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = async (password) => {
    const res = await registerUser({
      password,
      ...userInfo,
    });
    if (res.success) {
      Toast.show('Successfully registered');
      return;
    }
    Toast.show('Failed to register');
  };

  return (
    <div>
      <Show visible={step === STEP.ONE}>
        <FirstStepRegistration gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO} isMount>
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
