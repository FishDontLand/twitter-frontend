import { Popup, Toast } from 'antd-mobile';
import { UserOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';
import { useAppContext } from '@utils/context';
import { useGoto } from '@utils/hooks';
import Avatar from '@components/Avatar';
import Cookies from 'js-cookie';
import style from './index.module.scss';

/**
*
*/
const MyPopUp = ({
  visible,
  onClose,
}) => {
  const [store] = useAppContext();
  const go = useGoto();
  const handleLogout = () => {
    Cookies.set('userId', '');
    Toast.show('Successfully logged out');
    window.location.reload();
  };
  const handleToUserInfo = () => {
    onClose();
    go('/myPage');
  };

  const handleOnClickFollow = () => {
    onClose();
    go('/follow');
  };

  return (
    <div className={style.container}>
      <Popup
        visible={visible}
        onMaskClick={onClose}
        position="left"
        bodyStyle={{ width: '60vw' }}
      >
        <div className={style.container}>
          <div className={style.title}>Account</div>
          <Avatar avatarUrl={store.user?.avatar_url} className={style.avatar} />
          <div className={style.nickname}>
            {store.user?.nickname || 'no nickname'}
          </div>
          <div className={style.username}>
            @
            {store.user?.username}
          </div>
          <div className={style.follow}>
            <span className={style.followingNum} onClick={handleOnClickFollow}>100</span>
            <span onClick={handleOnClickFollow}>Following</span>
            <span className={style.followerNum} onClick={handleOnClickFollow}>200</span>
            <span onClick={handleOnClickFollow}>Follower</span>
          </div>
          <div className={style.listItem} onClick={handleToUserInfo}>
            <UserOutline />
            <span className={style.info}>
              User Info
            </span>
          </div>
          <div className={style.footer} onClick={handleLogout}>
            Logout
          </div>
        </div>
      </Popup>
    </div>
  );
};

MyPopUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyPopUp;
