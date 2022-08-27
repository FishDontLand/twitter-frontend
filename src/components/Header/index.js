import { useAppContext } from '@utils/context';
import { CloseOutline } from 'antd-mobile-icons';
import { useGoto, useAttribute } from '@utils/hooks';
import leftArrow from '@assets/left-arrow.svg';
import logo from '@assets/twitter-logo.svg';
import PropTypes from 'prop-types';
import MyPopUp from '@components/MyPopup';
import { useState } from 'react';
import Avatar from '@components/Avatar';
import style from './index.module.scss';

/**
 * Header component for all twitter pages
 */
const Header = ({
  children,
  title,
}) => {
  const [store] = useAppContext();
  const result = [];
  const navigate = useGoto();
  const attributes = useAttribute();
  const [visible, setVisible] = useState(false);
  // header to display when logged in
  if (store.user) {
    if (attributes.hideCommonHeader) {
      result.push(
        <div className={style.headerWrapper} key="backHeader">
          <img src={leftArrow} alt="back" className={style.back} onClick={() => navigate()} />
          {children}
        </div>,
      );
      if (title) {
        result.push(
          <span className={style.title} key="custom title">
            {title}
          </span>,
        );
      } else if (attributes.title) {
        result.push(
          <span className={style.title} key="title">
            {attributes.title}
          </span>,
        );
      }
    } else {
      result.push(
        <MyPopUp visible={visible} onClose={() => { setVisible(false); }} key="popup" />,
      );
      result.push(
        <Avatar key="avatarUrl" onClick={() => { setVisible(true); }} avatarUrl={store.user?.avatar_url} className={style.backHeader} />,
      );
      result.push(
        <span className={style.title} key="title">
          {attributes.title}
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
  title: PropTypes.string,
};

Header.defaultProps = {
  children: null,
  title: null,
};

export default Header;
