import { useState } from 'react';
import { Input, Button, Form } from 'antd-mobile';
import Header from '@components/Header';
import DateInput from '@components/DateInput';
import Tinput from '@components/Tinput';
import style from './index.module.scss';

const REGISTER_METHOD = {
  PHONE: 'PHOONE',
  EMAIL: 'EMAIL',
};

const Register = () => {
  const [form] = Form.useForm();
  const [registerMethod, setRegisterMethod] = useState(REGISTER_METHOD.PHONE);
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
      console.log(validation);
    }
  };

  return (
    <div>
      <Header />
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <Form form={form} initialValues={formData} className={style.formContainer}>
          <Form.Item name="name" rules={[{ required: true, message: 'name required' }]}>
            <Tinput length={50} label="Name" />
          </Form.Item>
          {registerMethod === REGISTER_METHOD.PHONE && (
          <Form.Item name="phone" rules={[{ required: true, message: 'phone required' }]}>
            <Tinput length={10} label="phone" />
          </Form.Item>
          )}
          {registerMethod === REGISTER_METHOD.EMAIL && (
          <Form.Item name="email" rules={[{ required: true, message: 'email required' }]}>
            <Input placeholder="Email" className={style.input} />
          </Form.Item>
          )}
          <div className={style.changeTypeButton} onClick={onRegisterMethodChange}>
            {registerMethod === REGISTER_METHOD.PHONE ? 'Use email' : 'Use phone number'}
          </div>
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
      <div className={style.footer}>
        <Button className={style.footerButton} onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Register;
