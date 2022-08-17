import TweetCard from '@components/TweetCard';
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import { useState } from 'react';
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
  content: 'Id values are not mutable. Any id value in the body of your PUT or PATCH request will be ignored. Only a value set in a POST request will be respected, but only if not already taken.',
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

const tweet1 = {
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
  content: 'TGIF!',
  likes: [], // users that likes the tweet
  likes_count: 10, // number of likes
  comments_count: 122, // number of comments
  has_liked: false, // whether the current logged in use has liked this tweet
  photo_urls: ['https://mooc-drop.oss-cn-beijing.aliyuncs.com/20200607085521_Czt8N.gif',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  ], // address of the pictures in the tweet
};

const defaultData = [];

for (let i = 0; i < 100; i += 1) {
  if (Math.random() < 0.5) {
    defaultData.push(tweet);
  } else {
    defaultData.push(tweet1);
  }
}
/**
* Tweets page
*/
const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});

const Tweets = () => {
  const [data] = useState(defaultData);
  console.log(data);
  const noRowsRenderer = () => 'Loading...';

  const rowRenderer = ({
    index, key, style: sy, parent,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={sy} key={key} ref={registerChild}>
          <TweetCard dataSource={data[index]} />
        </div>
      )}
    </CellMeasurer>
  );

  return (
    <div className={style.container}>
      <WindowScroller>
        {({
          isScrolling, registerChild, onChildScroll,
        }) => (
          <div ref={registerChild}>
            <List
              height={700}
              overscanRowCount={3}
              deferredMeasurementCache={cache}
              noRowsRenderer={noRowsRenderer}
              rowCount={data.length}
              rowRenderer={rowRenderer}
              width={360}
              rowHeight={cache.rowHeight}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
            />
          </div>
        )}
      </WindowScroller>
    </div>
  );
};

export default Tweets;
