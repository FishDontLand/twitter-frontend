import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from '@components/Header';
import Bottom from '@components/Bottom';
import { useEffect } from 'react';
import { Toast } from 'antd-mobile';
import Cookies from 'js-cookie';
import { useAppContext } from '@utils/context';
import { useAttribute } from '@utils/hooks';
import CreateTweetButton from '@components/CreateTweetButton';
import style from './index.module.scss';
import { getUser } from '../../services/login';

const App = () => {
  const [, setStore] = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  const attributes = useAttribute();
  useEffect(() => {
    const init = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        Toast.show('Please login again');
        nav('/login');
        return;
      }
      const res = await getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          nav('/tweets');
        }
        return;
      }
      nav('login');
    };
    init();
  }, []);

  const onClickCreateTweet = () => {
    nav('/createTweet');
  };

  return (
    <div className={style.layout}>
      {!attributes.hideCommonHeader && <Header />}
      <Outlet />
      <Bottom />
      {!attributes.hideCommonHeader && <CreateTweetButton onClick={onClickCreateTweet} />}
    </div>
  );
};

export default App;
