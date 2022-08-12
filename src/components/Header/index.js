import { useAppContext } from '@utils/context';
import { CloseOutline } from 'antd-mobile-icons';
import { useGoto, useAttribute } from '@utils/hooks';
import leftArrow from '@assets/left-arrow.svg';
import logo from '@assets/twitter-logo.svg';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
 * Header component for all twitter pages
 */
const Header = ({
  children,
}) => {
  const [store] = useAppContext();
  const result = [];
  const navigate = useGoto();
  const attributes = useAttribute();
  // header to display when logged in
  if (store.user) {
    if (attributes.hideCommonHeader) {
      result.push(
        <div className={style.headerWrapper} key="backHeader">
          <img src={leftArrow} alt="back" className={style.back} onClick={navigate} />
          {children}
        </div>,
      );
    } else {
      result.push(
        <div className={style.backHeader} key="avatarUrl">
          <img src={store.user?.avatar_url} alt="User avatar" className={style.avatar} />
        </div>,
      );
      result.push(
        <span className={style.title} key="title">
          {store.title}
        </span>,
      );
    }
  }

  // header to display when not logged in
  if (store.closeHeaderHandler) {
    result.push(
      <CloseOutline className={style.closeIcon} onClick={store.closeHeaderHandler} />,
    );
    result.push(
      <img src={logo} alt="twitter-logo" className={style.logo} />,
    );
  }

  return (
    <div className={style.header}>
      {result}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
