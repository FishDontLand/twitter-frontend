import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import Login from '@containers/Login';
import { startVconsole } from './utils';
// import Register from './containers/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <Login />
    </ConfigProvider>
  </React.StrictMode>,
);

// start vconsole
startVconsole();
