import moment from 'moment';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';
import { useGoto } from '@utils/hooks';
import { LIKETYPE } from '@components/Bar/constants';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
* Tweet card
*/

const TweetCard = ({
  dataSource,
}) => {
  const nav = useGoto();
  return (
    <div className={style.container}>
      <div className={style.userInfo}>
        <div className={style.avatarContainer}>
          <img src={dataSource.user.avatar_url} alt="avatar" className={style.avatar} />
        </div>
        <div className={style.contentContainer}>
          <div className={style.header}>
            <span className={style.nickname}>
              {dataSource.user.nickname}
            </span>
            @
            <span className={style.userName}>{dataSource.user.username}</span>
            &nbsp; · &nbsp;
            {`${moment(dataSource.created_at).format('mm')}m`}
          </div>
          <div className={style.content} onClick={() => nav('tweet', { id: dataSource.id })}>
            {dataSource.content}
          </div>
          {dataSource.photo_urls && dataSource.photo_urls.length > 0 && (
          <div className={style.photo}>
            <ImageCard
              imgs={dataSource.photo_urls}
              commentCount={dataSource.comments_count}
              likeCount={dataSource.likes_count}
            />
          </div>
          )}
          <div className={style.bar}>
            <Bar
              id={dataSource.id}
              commentCount={dataSource.comments_count}
              likeCount={dataSource.likes_count}
              type={LIKETYPE.TWEET}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TweetCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.object.isRequired,
};

export default TweetCard;
