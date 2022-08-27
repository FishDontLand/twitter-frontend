import PropTypes from 'prop-types';
import defaultAvatar from '@assets/default_avatar.svg';
import classNames from 'classnames';
import style from './index.module.scss';

/**
*
*/
const Avatar = ({
  onClick,
  avatarUrl,
  className,
}) => (
  <div className={classNames(style.avatarWrapper, className)} onClick={onClick}>
    {avatarUrl ? <img src={avatarUrl} alt="" className={style.avatar} />
      : <img src={defaultAvatar} alt="" className={style.avatar} /> }
  </div>
);

Avatar.propTypes = {
  onClick: PropTypes.func,
  avatarUrl: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  onClick: () => {},
  avatarUrl: '',
  className: '',
};

export default Avatar;
