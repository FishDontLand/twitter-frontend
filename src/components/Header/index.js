import { CloseOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';
import logo from '../../assets/twitter-logo.svg';
import style from './index.module.scss';

const Header = ({ onClickClose }) => (
  <div className={style.header}>
    {onClickClose && <CloseOutline className={style.closeIcon} onClick={onClickClose} />}
    <img src={logo} alt="twitter-logo" className={style.logo} />
  </div>
);

Header.propTypes = {
  onClickClose: PropTypes.func,
};

Header.defaultProps = {
  onClickClose: null,
};

export default Header;
