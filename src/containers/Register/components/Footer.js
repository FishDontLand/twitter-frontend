import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import style from '../index.module.scss';

const Footer = ({
  nextStep,
  disabled,
  label,
}) => (
  <div className={style.footer}>
    <Button
      className={disabled ? style.footerButtonDisabled : style.footerButton}
      onClick={nextStep}
    >
      {label}

    </Button>
  </div>
);

Footer.propTypes = {
  nextStep: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default Footer;
