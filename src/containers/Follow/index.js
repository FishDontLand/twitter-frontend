import FollowItem from '@components/FollowItem';
import Header from '@components/Header';
import {
  getFollowInfo, setFollower,
} from '@services/user';
import { useAppContext } from '@utils/context';
import { Tabs } from 'antd-mobile';
import { useEffect, useState } from 'react';

import style from './index.module.scss';

const TYPE = {
  FOLLOWER: {
    key: 'follower',
    title: 'follower',
  },
  FOLLOWING: {
    key: 'following',
    title: 'following',
  },
};

const Follow = () => {
  const [booleanSwitch, setSwitch] = useState(false);
  const [data, setData] = useState({ following: [], follower: [] });
  const [store] = useAppContext();
  const handleFollow = async (user) => {
    const userCopy = { ...user };
    userCopy.has_followed = true;
    data.following.push(userCopy);
    const updatedFollower = data.follower.filter((item) => item.user.id !== user.user.id);
    updatedFollower.push(userCopy);
    await setFollower(store.user.id, { ...data, follower: updatedFollower });
    setSwitch((prevValue) => !prevValue);
  };

  const handleCancelFollow = async (user) => {
    const updatedFollowing = data.following.filter((item) => item.user.id !== user.user.id);
    const updatedFollower = data.follower.filter((item) => item.user.id !== user.user.id);
    if (updatedFollower.length < data.follower.length) {
      const userCopy = { ...user };
      userCopy.has_followed = false;
      updatedFollower.push(userCopy);
      await setFollower(
        store.user.id,
        { ...data, following: updatedFollowing, follower: updatedFollower },
      );
    } else {
      await setFollower(store.user.id, { ...data, following: updatedFollowing });
    }

    setSwitch((prevValue) => !prevValue);
  };

  useEffect(() => {
    const init = async () => {
      const followRes = await getFollowInfo(store.user.id);
      setData(followRes.data);
    };
    if (store.user) {
      init();
    }
  }, [store.user, booleanSwitch]);
  return (
    <div className={style.container}>
      <Header title={store.user?.nickname || 'no known'} />
      <Tabs>
        {Object.values(TYPE).map((item) => (
          <Tabs.Tab title={item.title} key={item.key}>
            {data[item.key].map((it) => (
              <FollowItem
                key={10 * item.key.length + it.user.id}
                avatarUrl={it.user.avatar_url}
                nickname={it.user.nickname}
                username={it.user.username}
                hasFollowed={it.has_followed}
                handleFollow={() => handleFollow(it)}
                handleCancelFollow={() => handleCancelFollow(it)}
              />
            ))}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Follow;
