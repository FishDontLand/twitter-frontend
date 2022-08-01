import TweetCard from '@components/TweetCard';
import { useState, useEffect } from 'react';
import style from './index.module.scss';
/**
* Tweets page
*/
const Tweets = () => {
  const [, setData] = useState();
  useEffect(() => {
    setData([]);
  }, []);
  return (
    <div className={style.container}>
      <TweetCard />
      <TweetCard />
      <TweetCard />
    </div>
  );
};

export default Tweets;
