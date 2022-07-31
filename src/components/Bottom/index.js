import { TabBar } from 'antd-mobile';
import { useState } from 'react';
import email from '@assets/email.svg';
import home from '@assets/home.svg';
import notification from '@assets/notification.svg';
import search from '@assets/search.svg';
import style from './index.module.scss';

/**
* Bottom bar
*/
const menu = [{
  key: 'home',
  icon: <img className={style.icon} src={home} alt="home" />,
  link: 'tweets',
  title: 'mainPage',
},
{
  key: 'search',
  link: '/',
  icon: <img className={style.icon} src={search} alt="" />,
},
{
  key: 'notification',
  title: 'notification',
  link: '/',
  icon: <img className={style.icon} src={notification} alt="" />,
},
{
  key: 'message',
  title: 'message',
  link: '/',
  icon: <img className={style.icon} src={email} alt="" />,
},
];

const Bottom = () => {
  const [activeKey, setActiveKey] = useState();

  const onClickTabItem = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={style.container}>
      <TabBar activeKey={activeKey} onChange={onClickTabItem}>
        {
      menu.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} />
      ))
}
      </TabBar>
    </div>
  );
};

export default Bottom;
