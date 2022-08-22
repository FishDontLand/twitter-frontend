import { Popup } from 'antd-mobile';
import { UserOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';
import { useAppContext } from '@utils/context';
import { useGoto } from '@utils/hooks';
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
          <img src={store.user?.avatar_url} alt="avatar" className={style.avatar} />
          <div className={style.nickname}>
            {store.user?.nickname || 'no nickname'}
          </div>
          <div className={style.username}>
            @
            {store.user?.username}
          </div>
          <div className={style.follow}>
            <span className={style.followingNum}>100</span>
            Following
            <span className={style.followerNum}>200</span>
            Follower
          </div>
          <div className={style.listItem} onClick={() => { go('myPage'); }}>
            <UserOutline />
            <span className={style.info}>
              User Info
            </span>
          </div>
          <div className={style.footer}>
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
