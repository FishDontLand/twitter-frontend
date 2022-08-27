import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
* Button component in the header
*/
const TButton = ({
  onClick,
  children,
  disabled,
}) => <Button disabled={disabled} className={style.button} onClick={onClick}>{children}</Button>;

TButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

TButton.defaultProps = {
  disabled: false,
};

export default TButton;
