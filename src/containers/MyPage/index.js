import { Button, Tabs } from 'antd-mobile';
import { useAppContext } from '@utils/context';
import Header from '@components/Header';
import { useState, useEffect } from 'react';
import { getTweets } from '@services/tweets';
import TweetCard from '@components/TweetCard';
import style from './index.module.scss';
/**
*
*/
const MyPage = () => {
  const [store] = useAppContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    const init = async () => {
      const res = await getTweets();
      setData(res.data);
    };
    init();
  }, []);
  return (
    <div className={style.container}>
      <Header title={store.user?.nickname} />
      <div className={style.header} />
      <img className={style.avatar} src={store.user?.avatar_url} alt="avatar" />
      <Button className={style.edit}>Edit</Button>
      <div className={style.nickname}>
        {store.user?.nickname}
      </div>
      <div className={style.username}>
        @
        {store.user?.username}
      </div>
      <div className={style.follow}>
        <span className={style.followingNum}>
          100
        </span>
        following
        <span className={style.followerNum}>
          200
        </span>
        follower
      </div>
      <Tabs>
        <Tabs.Tab title="Tweets" key="tweets">
          {data.map((item) => <TweetCard key={item.id} dataSource={item} />)}
        </Tabs.Tab>
        <Tabs.Tab title="Tweets and Replies" key="tweets and reply">
          tweets and reply
        </Tabs.Tab>
      </Tabs>

    </div>
  );
};

export default MyPage;
