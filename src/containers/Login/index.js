import { useState } from 'react';
import {
  Button, Input, Form, Dialog,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import './index.css';

const Login = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const clickHandler = () => {
    const values = form.getFieldsValue();
    Dialog.show({
      content: JSON.stringify(values),
      actions: [{ key: 'confirmation', text: 'Got it!' }],
      closeOnAction: true,
    });
  };

  return (
    <div className="login">
      <Form
        layout="horizontal"
        mode="card"
        form={form}
        footer={
          <Button color="primary" onClick={clickHandler}>sign in</Button>
        }
      >
        <Form.Item label="Username" name="username">
          <Input placeholder="Please enter here" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="pwd"
          extra={(
            <div className="eye">
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          )}
        >
          <Input
            placeholder="Input Password"
            type={visible ? 'text' : 'password'}
            clearable
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
