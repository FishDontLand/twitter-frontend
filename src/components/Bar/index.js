import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import comment from '@assets/comment.svg';
import like from '@assets/like.svg';
import share from '@assets/share.svg';
import retweet from '@assets/retweet.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './index.module.scss';

/**
* Bar of comment, share, like, and forward
*/

const getBar = ({
  commentCount,
  likeCount,
}) => [{
  key: 'comment',
  icon: (
    <div>
      <img className={style.icon} src={comment} alt="comment" />
      {commentCount > 0 && <span className={style.count}>{commentCount}</span>}
    </div>),
},
{
  key: 'retweet',
  icon: <img className={style.icon} src={retweet} alt="retweet" />,
},
{
  key: 'like',
  icon: (
    <div>
      <img className={style.icon} src={like} alt="comment" />
      {likeCount > 0 && <span className={style.count}>{likeCount}</span>}
    </div>),
},
{
  key: 'share',
  icon: <img className={style.icon} src={share} alt="share" />,
},
];

const Bar = ({
  likeCount,
  commentCount,
  isBottom,
}) => {
  const [activeKey, setActiveKey] = useState();

  const onChangeTabItem = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={classNames({
      [style.container]: !isBottom,
      [style.containerBottom]: isBottom,
    })}
    >
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBar({
          likeCount,
          commentCount,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  isBottom: PropTypes.bool,
};

Bar.defaultProps = {
  likeCount: 0,
  commentCount: 0,
  isBottom: false,
};

export default Bar;
