import { useState, useEffect } from 'react';
import Header from '@components/Header';
import ImageCard from '@components/ImageCard';
import moment from 'moment';
import Bar from '@components/Bar';
import CommentCard from '@components/CommentCard';
import { LIKETYPE } from '@components/Bar/constants';
import style from './index.module.scss';

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

/**
*
*/
const Tweet = () => {
  const [data, setData] = useState(tweet);
  useEffect(() => {
    console.log('data', data);
    setData(tweet);
  }, []);
  return (
    <div className={style.container}>
      <Header />
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={data.user.avatar_url} alt="" className={style.avatar} />
          <div className={style.right}>
            <div className={style.nickname}>
              {data.user.nickname}
            </div>
            <div className={style.username}>
              @
              {data.user.username}
            </div>
          </div>
        </div>
        <div className={style.content}>
          {data.content}
        </div>
        <div className={style.photo}>
          <ImageCard
            imgs={data.photo_urls}
            likeCount={data.likes_count}
            commentCount={data.comments_count}
          />
        </div>
        <div className={style.timeline}>
          {
          moment(data.created_at).format('h:m A · YYYY MMM D ')
        }
          · Twitter for iphone
        </div>
        <div className={style.bar}>
          <Bar
            id={data.id}
            likeCount={data.likes_count}
            commentCount={data.comments_count}
            type={LIKETYPE.TWEET}
          />
        </div>
      </div>
      <CommentCard data={tweet} />
    </div>
  );
};

export default Tweet;
