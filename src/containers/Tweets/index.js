import TweetCard from '@components/TweetCard';
import { useState, useEffect } from 'react';
import style from './index.module.scss';
/**
* Tweets page
*/
const Tweets = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log('data', data);
    setData([]);
  }, []);
  return (
    <div className={style.container}>
      <TweetCard />
    </div>
  );
};

export default Tweets;
