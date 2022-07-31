import moment from 'moment';
import { useState, useEffect } from 'react';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';
import style from './index.module.scss';

/**
* Tweet card
*/

const tweet = {
  id: 1, // tweet id
  user: {
    id: 2, // id of user who posts the tweet
    username: 'EpikGaming',
    nickname: 'EpikGamingT3',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg', // address of avatar
  }, // information of the user who posts the tweet
  comments: [
    {
      id: 1, // comment id
      tweet_id: 1,
      user: {
        id: 1, // id of user who makes the comment
        username: 'admin',
        nickname: 'EpikGamingT3',
        avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg', // address of avatar
      }, // information of the user who makes the comment
      content: 'Test!', // content of the comment
      created_at: '2021-12-22T15:03:52.662052Z', // create time of the comment
      likes_count: 10, // number of likes
      has_liked: false, // whether the current logged in user has liked this comment
    },
    {
      id: 2, // comment id
      tweet_id: 1, // tweet id
      user: {
        id: 1,
        username: 'admin',
        nickname: 'EpikGamingT3',
        avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
      },
      content: 'Test!',
      created_at: '2021-12-22T15:03:52.662052Z',
      likes_count: 10,
      has_liked: false,
    },
  ], // set of comments
  created_at: '2021-12-18T07:38:01.699129Z', // tweet creation time
  content: 'Id values are not mutable. Any id value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.', // 该推文的文本内容
  likes: [], // users that likes the tweet
  likes_count: 10, // number of likes
  comments_count: 122, // number of comments
  has_liked: false, // whether the current logged in use has liked this tweet
  photo_urls: ['https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZuKXKJeqzfVVrwwS6IZ0NfZUwaxMoXiJkeya7tUM04zl3BJtbbbx2rThPKxwpXeufwbc&usqp=CAU',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  ], // address of the pictures in the tweet
};

const TweetCard = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log('data', data);
    setData([]);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.userInfo}>
        <div className={style.avatarContainer}>
          <img src={tweet.user.avatar_url} alt="avatar" className={style.avatar} />
        </div>
        <div className={style.contentContainer}>
          <div className={style.header}>
            <span className={style.nickname}>
              {tweet.user.nickname}
            </span>
            @
            <span className={style.userName}>{tweet.user.username}</span>
            &nbsp; · &nbsp;
            {`${moment(tweet.created_at).format('MM')}m`}
          </div>
          <div className={style.content}>
            {tweet.content}
          </div>
          <div className={style.photo}>
            <ImageCard imgs={tweet.photo_urls} />
          </div>
          <div className={style.bar}>
            <Bar commentCount={tweet.comments_count} likeCount={tweet.likes_count} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
