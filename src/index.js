import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import Login from '@containers/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '@containers/App';
import { ContextProvider } from '@utils/context';
import Tweets from '@containers/Tweets';
import Comment from '@containers/Comment';
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
              <Route path="/comments" element={<Comment />} />
              <Route path="/search" element={<Comment />} />
              <Route path="/notification" element={<Comment />} />
              <Route path="/message" element={<Comment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
