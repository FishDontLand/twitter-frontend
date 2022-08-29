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
import MyPage from '@containers/MyPage';
import EditUser from '@containers/EditUser';
import Follow from '@containers/Follow';
import Register from './containers/Register';
import CreateTweet from './containers/CreateTweet';
import Tweet from './containers/Tweet';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={enUS}>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Tweets />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/makeComments/:id" element={<Comment />} />
            <Route path="/search" element={<Comment />} />
            <Route path="/notification" element={<Comment />} />
            <Route path="/message" element={<Comment />} />
            <Route path="/createTweet" element={<CreateTweet />} />
            <Route path="/tweet/:id" element={<Tweet />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/follow" element={<Follow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </ConfigProvider>,
);
