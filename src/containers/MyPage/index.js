import { Button, Tabs } from 'antd-mobile';
import { useAppContext } from '@utils/context';
import Header from '@components/Header';
import { useState, useEffect } from 'react';
import { getTweets } from '@services/tweets';
import TweetCard from '@components/TweetCard';
import { useGoto } from '@utils/hooks';
import style from './index.module.scss';
/**
*
*/
const MyPage = () => {
  const [store] = useAppContext();
  const [data, setData] = useState([]);
  const nav = useGoto();
  useEffect(() => {
    const init = async () => {
      const res = await getTweets(store.user.id);
      const userData = res.data.filter((item) => item.id === store.user.id);
      setData(userData);
    };
    if (store && store.user && store.user.id) {
      init();
    }
  }, [store]);

  if (!store) {
    return null;
  }
  if (!store.user) {
    return null;
  }
  const wrapItem = (item) => {
    const wrappedItem = {
      ...item,
      user: { avatar_url: store.user.avatar_url },
    };
    return wrappedItem;
  };
  return (
    <div className={style.container}>
      <Header title={store.user?.nickname} />
      <div className={style.header} />
      <img className={style.avatar} src={store.user?.avatar_url} alt="avatar" />
      <Button className={style.edit} onClick={() => { nav('/editUser'); }}>Edit</Button>
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
          {data.map((item) => <TweetCard key={item.id} dataSource={wrapItem(item)} />)}
        </Tabs.Tab>
        <Tabs.Tab title="Tweets and Replies" key="tweets and reply">
          tweets and reply
        </Tabs.Tab>
      </Tabs>

    </div>
  );
};

export default MyPage;
