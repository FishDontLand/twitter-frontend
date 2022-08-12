import email from '@assets/email.svg';
import home from '@assets/home.svg';
import notification from '@assets/notification.svg';
import search from '@assets/search.svg';
import style from '../common.module.scss';

export const menu = [{
  key: 'home',
  icon: <img className={style.icon} src={home} alt="home" />,
  link: '/',
  inBottomBar: true,
  title: 'Home',
},
{
  key: 'search',
  link: '/search',
  icon: <img className={style.icon} src={search} alt="" />,
  inBottomBar: true,
},
{
  key: 'notification',
  title: 'Notification',
  link: '/notification',
  icon: <img className={style.icon} src={notification} alt="" />,
  inBottomBar: true,
},
{
  key: 'message',
  title: 'Message',
  link: '/message',
  icon: <img className={style.icon} src={email} alt="" />,
  hideCommonHeader: false,
  inBottomBar: true,
},
{
  key: 'comment',
  title: 'comments',
  link: '/comments/:id',
  hideCommonHeader: true,
  inBottomBar: false,
},
{
  key: 'creatTweet',
  title: 'createTweet',
  link: '/createTweet',
  hideCommonHeader: true,
},
];
