import { useAppContext } from '@utils/context';
import { Steps, TextArea, Toast } from 'antd-mobile';
import moment from 'moment';
import { useState } from 'react';
import Header from '@components/Header';
import TButton from '@components/TButton';
import { createComment } from '@services/comments';
import { useParams } from 'react-router-dom';
import { useGoto } from '@utils/hooks';
import style from './index.module.scss';
/**
* Comment Component
*/

const { Step } = Steps;

const defaultTweet = {
  id: 1, // tweet id
  user: {
    id: 2,
    username: 'EpikGaming',
    nickname: 'EpikGamingT3',
    avatar_url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg', // 发送该推文的用户头像地址
  }, // tweet user info
  comments: [
    {
      id: 1, // comment id
      tweet_id: 1,
      user: {
        id: 1,
        username: 'admin',
        nickname: null,
        avatar_url: null,
      },
      content: 'Test!',
      created_at: '2021-12-22T15:03:52.662052Z',
      likes_count: 0, // number of likes for this tweet
      has_liked: false, // whether the current user likes this tweet
    },
  ],
  created_at: '2021-12-18T07:38:01.699129Z', // tweet creation time
  content: 'This is a test,This is a test,This is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a testThis is a test',
  likes: [], // list of users that have liked this tweet
  likes_count: 0, // number of likes for this tweet
  comments_count: 1, // number of comments under this tweet
  has_liked: false,
  photo_urls: [], // list of photos under this tweet
};

const Comment = () => {
  const [store] = useAppContext();
  const [data] = useState(defaultTweet);
  const [text, setText] = useState('');
  const params = useParams();
  const go = useGoto();
  const onClickReply = () => {
    createComment({
      content: text,
      tweet_id: params.id,
    }).then((res) => {
      if (res?.success) {
        Toast.show('Successfully Replied');
        go();
        return;
      }
      Toast.show('Failed to Reply');
    });
  };

  const onChangeText = (v) => {
    setText(v);
  };
  return (
    <div className={style.container}>
      <Header>
        <TButton onClick={onClickReply} disabled={text.length === 0}>Reply</TButton>
      </Header>
      <Steps
        direction="vertical"
      >
        <Step
          icon={<img src={data.user.avatar_url} alt="avatar" className={style.icon} />}
          title={(
            <div className={style.stepContent}>
              <div className={style.header}>
                <span>{data.user.nickname}</span>
                @
                <span>
                  {data.user.username}
            &nbsp; · &nbsp;
                  {`${moment(data.created_at).format('MMM DD')}`}

                </span>
              </div>
              <div className={style.content}>
                {data.content}
              </div>
              <div className={style.reply}>
                Reply
                <span className={style.user}>
                  @
                  {data.user.username}
                </span>
              </div>
            </div>
      )}
        />
        <Step
          icon={
            <img className={style.icon} src={store.user?.avatar_url} alt="avatar" />
          }
          title={(
            <div>
              <TextArea onChange={onChangeText} value={text} className={style.text} placeholder="Type here" />
            </div>
          )}
        />
      </Steps>
    </div>
  );
};

export default Comment;
