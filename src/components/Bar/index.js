import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionSheet, TabBar, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cancelLike, likes } from '@services/comments';
import style from './index.module.scss';
import {
  getBar, ACTIONKEYS, ACTIONS, LIKETYPE,
} from './constants';
/**
* Bar of comment, share, like, and forward
*/

const Bar = ({
  id,
  likeCount,
  commentCount,
  isBottom,
  onlyStar,
  type,
}) => {
  const [activeKey, setActiveKey] = useState();
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);
  const onAction = (e) => {
    if (e.key === ACTIONKEYS.COPY) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/tweet/${id}`);
        Toast.show('link copied');
      }
    }
    setVisible(false);
  };

  const nav = useNavigate();

  const onClickLike = () => {
    if (liked) {
      setLiked(false);
      cancelLike({
        countent_type: type,
        object_id: id,
      }).then((res) => {
        if (res.success) {
          setLiked(false);
        }
      });
      return;
    }
    likes({
      content_type: type,
      object_id: id,
    }).then((res) => {
      if (res.success) {
        setLiked(true);
      }
    });
  };

  const onClickShare = () => {
    setVisible(true);
  };

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
          nav,
          id,
          onlyStar,
          liked,
          onClickLike,
          onClickShare,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
      <ActionSheet
        visible={visible}
        actions={ACTIONS}
        onClose={() => setVisible(false)}
        onAction={onAction}
      />
    </div>
  );
};

Bar.propTypes = {
  id: PropTypes.number.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  isBottom: PropTypes.bool,
  onlyStar: PropTypes.bool,
  type: PropTypes.oneOf([LIKETYPE.TWEET, LIKETYPE.COMMENT]),
};

Bar.defaultProps = {
  likeCount: 0,
  commentCount: 0,
  isBottom: false,
  onlyStar: false,
  type: '',
};

export default Bar;
