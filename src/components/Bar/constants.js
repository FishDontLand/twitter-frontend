import comment from '@assets/comment.svg';
import like from '@assets/like.svg';
import heartFilled from '@assets/heart-filled.svg';
import share from '@assets/share.svg';
import retweet from '@assets/retweet.svg';
import copyIcon from '@assets/copy-link.svg';
import style from './index.module.scss';

export const BARKEYS = {
  LIKE: 'like',
  COMMENT: 'comment',
  SHARE: 'share',
  RETWEET: 'retweet',
};

export const getBar = ({
  commentCount,
  likeCount,
  nav,
  id,
  onlyStar,
  liked,
  onClickLike,
  onClickShare,
}) => {
  if (onlyStar) {
    return [{
      key: BARKEYS.LIKE,
      icon: (
        <div>
          {liked ? <img className={style.icon} src={heartFilled} alt="liked" onClick={onClickLike} />
            : <img className={style.icon} src={like} alt="like" onClick={onClickLike} /> }
          {likeCount > 0 && <span className={style.count}>{likeCount}</span>}
        </div>),
    }];
  }

  return [{
    key: BARKEYS.COMMENT,
    icon: (
      <div onClick={() => nav(`/makeComments/${id}`)}>
        <img className={style.icon} src={comment} alt="comments" />
        {commentCount > 0 && <span className={style.count}>{commentCount}</span>}
      </div>),
  },
  {
    key: BARKEYS.RETWEET,
    icon: <img className={style.icon} src={retweet} alt="retweet" />,
  },
  {
    key: BARKEYS.LIKE,
    icon: (
      <div>
        {liked ? <img className={style.icon} src={heartFilled} alt="liked" onClick={onClickLike} />
          : <img className={style.icon} src={like} alt="like" onClick={onClickLike} /> }
        {likeCount > 0 && <span className={style.count}>{likeCount}</span>}
      </div>),
  },
  {
    key: BARKEYS.SHARE,
    icon: <img className={style.icon} src={share} alt="share" onClick={onClickShare} />,
  },
  ];
};

/**
 * define constants for operations in share link
 */
export const ACTIONKEYS = {
  COPY: 'copy',
  CANCEL: 'cancel',
};

export const ACTIONS = [
  {
    text:
  <div className={style.copyContainer}>
    <img alt="" src={copyIcon} className={style.copyIcon} />
    <div className={style.copyText}>
      Copy link
    </div>
  </div>,
    key: ACTIONKEYS.COPY,
  },
  {
    text: <div className={style.cancel}>Cancel</div>, key: ACTIONKEYS.CANCEL,
  },
];

export const LIKETYPE = {
  TWEET: 'tweet',
  COMMENT: 'comment',
};
