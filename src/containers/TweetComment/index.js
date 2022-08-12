import { useState, useEffect } from 'react';
import style from './index.module.scss';

/**
*
*/
const TweetComment = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log('data', data);
    setData([]);
  }, []);
  return <div className={style.container}>{data}</div>;
};

export default TweetComment;
