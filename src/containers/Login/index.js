import { useState } from 'react';
import './index.css'

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const clickHandler = () => {
    alert('Successfully logged in' + name + ',' + password);
  }

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  }

  const onChangePwdHandler = (e) => {
    setPassword(e.target.value);
  }
  return (
    <div className="login">
        <div>Username: <input onChange={onChangeNameHandler}/></div>
        <div>Password: <input type="password" onChange={onChangePwdHandler}/></div>
        <div><button onClick={clickHandler}>sign in</button></div>
    </div>
  );
}

export default Login;