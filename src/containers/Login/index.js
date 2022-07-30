import Tinput from '@components/Tinput';
import { useEffect } from 'react';
import {
  Button, Form, Dialog,
} from 'antd-mobile';
import { Link } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import style from './index.module.scss';
import { login } from '../../services/login';

const Login = () => {
  const [form] = Form.useForm();

  const [, setStore] = useAppContext();

  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
  }, []);

  const clickHandler = async () => {
    const values = await form.getFieldsValue();
    if (values && values.username && values.pwd) {
      const res = await login(values.username, values.pwd);
      if (res && res.success && res.data.length > 0) {
        Dialog.show({
          content: 'Login Succeeded',
          actions: [{ key: 'confirmation', text: 'Confirm' }],
          closeOnAction: true,
        });
        return;
      }

      Dialog.show({
        content: 'Login failed',
        actions: [{ key: 'confirmFailure', text: 'Accept' }],
        closeOnAction: true,
      });
    }
  };

  return (
    <div className={style.login}>

      <div className={style.formTitle}>
        Login Twitter
      </div>
      <Form
        className={style.formContainer}
        layout="horizontal"
        form={form}
      >
        <Form.Item name="username" rules={[{ required: true, message: 'Username must be provided' }]}>
          <Tinput label="Username" />
        </Form.Item>
        <Form.Item
          name="pwd"
          rules={[{ required: true, message: 'Password must be provided' }]}
        >
          <Tinput
            label="Password"
          />
        </Form.Item>
        <Button className={style.footerButton} onClick={clickHandler}>sign in</Button>
      </Form>
      <div className={style.goToRegister}>
        No account?
        {' '}
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
