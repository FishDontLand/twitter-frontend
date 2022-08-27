// import home from '@assets/home.svg';
// import profile from '@assets/profile.svg';
// import style from '../common.module.scss';
import { UnorderedListOutline, UserCircleOutline } from 'antd-mobile-icons';

export const menu = [{
  key: 'home',
  // icon: <img className={style.icon} src={home} alt="home" />,
  icon: <UnorderedListOutline />,
  link: '/',
  inBottomBar: true,
  title: 'Home',
},
{
  key: 'myPage',
  link: '/myPage',
  // icon: <img className={style.icon} src={profile} alt="" />,
  icon: <UserCircleOutline />,
  inBottomBar: true,
  hideCommonHeader: false,
},
{
  key: 'comment',
  link: '/makeComments/:id',
  hideCommonHeader: true,
  inBottomBar: false,
},
{
  key: 'creatTweet',
  link: '/createTweet',
  hideCommonHeader: true,
},
{
  key: 'tweet',
  title: 'Tweet',
  link: '/tweet/:id',
  hideCommonHeader: true,
},
{
  key: 'editUser',
  link: '/editUser',
  hideCommonHeader: true,
},
{
  key: 'login',
  link: '/login',
  hideCommonHeader: true,
},
{
  key: 'register',
  link: '/register',
  hideCommonHeader: true,
},
];
