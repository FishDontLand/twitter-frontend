import { useState } from 'react';
import { Form } from 'antd-mobile';
import DateInput from '@components/DateInput';
import PropTypes from 'prop-types';
import Tinput from '@components/Tinput';
import Footer from './Footer';
import style from '../index.module.scss';

const REGISTER_METHOD = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
};

const FirstStepRegistration = ({
  gotoNextStepHandler,
}) => {
  const [form] = Form.useForm();
  const [registerMethod, setRegisterMethod] = useState(REGISTER_METHOD.PHONE);
  const [disable, setDisable] = useState(true);
  const onRegisterMethodChange = () => {
    if (registerMethod === REGISTER_METHOD.PHONE) {
      setRegisterMethod(REGISTER_METHOD.EMAIL);
      return;
    }
    if (registerMethod === REGISTER_METHOD.EMAIL) {
      setRegisterMethod(REGISTER_METHOD.PHONE);
    }
  };
  const [formData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '2022-02-03',
  });

  const nextStep = async () => {
    const validation = await form.validateFields();
    if (validation) {
      gotoNextStepHandler(validation);
    }
  };

  const onValuesChange = async () => {
    try {
      const validate = await form.validateFields();
      if (validate) {
        setDisable(false);
        return;
      }
    } catch (e) {
      if (e.errorFields.length === 0) {
        setDisable(false);
        return;
      }
      setDisable(true);
    }
  };

  return (
    <div>
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <Form
          form={form}
          initialValues={formData}
          className={style.formContainer}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="name" rules={[{ required: true, message: 'name required' }]}>
            <Tinput length={50} label="Name" />
          </Form.Item>
          {registerMethod === REGISTER_METHOD.PHONE && (
          <Form.Item name="phone" rules={[{ required: true, message: 'valid phone number required', pattern: /^\d{10}$/g }]}>
            <Tinput length={10} label="Phone" />
          </Form.Item>
          )}
          {registerMethod === REGISTER_METHOD.EMAIL && (
          <Form.Item name="email" rules={[{ required: true, message: 'valid email required', pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g }]}>
            <Tinput label="Email" />
          </Form.Item>
          )}
          <span className={style.changeTypeButton} onClick={onRegisterMethodChange}>
            {registerMethod === REGISTER_METHOD.PHONE ? 'Use email' : 'Use phone number'}
          </span>
          <div className={style.birthdayTitle}>Date of birth</div>
          <div>
            This will not be shown publicly. Confirm your own age,
            even if this account is for a business, a pet, or something else.
          </div>
          <Form.Item name="birthday">
            <DateInput />
          </Form.Item>
        </Form>
      </div>
      <Footer disabled={disable} label="Next" nextStep={nextStep} />
    </div>
  );
};

FirstStepRegistration.propTypes = {
  gotoNextStepHandler: PropTypes.func.isRequired,
};

export default FirstStepRegistration;
