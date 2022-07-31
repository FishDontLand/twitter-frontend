import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import Login from '@containers/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '@containers/App';
import { ContextProvider } from '@utils/context';
import Tweets from '@containers/Tweets';
import { startVconsole } from './utils';
import Register from './containers/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tweets" element={<Tweets />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ConfigProvider>
  </React.StrictMode>,
);

// start vconsole
startVconsole();
