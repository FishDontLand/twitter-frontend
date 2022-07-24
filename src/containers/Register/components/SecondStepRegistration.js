import { useState } from 'react';
import { Input } from 'antd-mobile';
import PropTypes from 'prop-types';
import Footer from './Footer';
import style from '../index.module.scss';

const SecondStepRegistration = ({
  confirmRegisterHandler,
  userInfo,
}) => {
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);

  const onConfirmRegister = () => {
    confirmRegisterHandler(password);
  };

  const onChangePwd = (val) => {
    setPassword(val);
  };

  const onChangeConfirmPwd = (val) => {
    if (val === password) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };

  return (
    <div className={style.SecondStepRegistration}>
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <div className={style.showLabelContainer}>
          <div className={style.showLabel}>
            Name:
            <span>{userInfo.name}</span>
          </div>
          {userInfo.email && (
          <div className={style.showLabel}>
            Email:
            <span>{userInfo.email}</span>
          </div>
          )}
          {userInfo.phone && (
          <div className={style.showLabel}>
            Phone:
            <span>{userInfo.phone}</span>
          </div>
          )}
          <div className={style.showLabel}>
            Birthday:
            <span>{userInfo.birthday}</span>
          </div>
        </div>
      </div>
      <div className={style.label}>Please enter password</div>
      <Input className={style.input} onChange={onChangePwd} />
      <div className={style.label}>Please enter password again</div>
      <Input className={style.input} type="password" onChange={onChangeConfirmPwd} />
      {disabled && (<div className={style.showTip}>Password not the same!</div>)}
      <Footer label="Sign Up" nextStep={onConfirmRegister} disabled={disabled} />
    </div>
  );
};

SecondStepRegistration.propTypes = {
  confirmRegisterHandler: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
};

export default SecondStepRegistration;
