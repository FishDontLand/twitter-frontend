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
  const [store, setStore] = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  const attributes = useAttribute();
  useEffect(() => {
    const init = async () => {
      if (attributes.key === 'register') {
        return;
      }
      const userId = Cookies.get('userId');
      if (!userId) {
        Toast.show('Please login again');
        nav('/login');
        return;
      }
      if (store.user) {
        return;
      }
      const res = await getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      nav('login');
    };
    init();
  }, [location.pathname]);

  const onClickCreateTweet = () => {
    nav('/createTweet');
  };

  return (
    <div className={style.layout}>
      {!attributes.hideCommonHeader && <Header />}
      <Outlet />
      {attributes.key !== 'register' && <Bottom />}
      {!attributes.hideCommonHeader && <CreateTweetButton onClick={onClickCreateTweet} />}
    </div>
  );
};

export default App;
