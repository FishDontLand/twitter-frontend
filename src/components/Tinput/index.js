/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Input } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import style from './index.module.scss';
// import openEye from '../../assets/open-eye.svg';
// import closeEye from '../../assets/close-eye.svg';

const Tinput = ({
  label, value, length, onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
      setHide(true);
    }
  }, [value]);

  const onFocus = () => {
    setIsFocused(true);
    setHide(true);
  };

  const onBlur = () => {
    if (!value || value.length === 0) {
      setIsFocused(false);
      setHide(false);
    }
    setHide(false);
  };

  const onChangeHandler = (val) => {
    if (length && val.length > length) {
      return;
    }
    onChange(val);
  };

  const [eyeOpen, setEyeOpen] = useState(false);

  const onClickEye = () => {
    setEyeOpen(!eyeOpen);
  };

  return (
    <div className={hide ? style.tinputFocused : style.tinput}>
      <div className={isFocused ? style.labelFocused : style.label}>
        {label}
        {hide && length && (
        <span className={hide ? style.labelRightFocused : style.labelRight}>
          {value?.length}
          /
          {length}
        </span>
        )}
      </div>
      <div className={style.passwordInput}>
        <Input
          className={isFocused ? style.inputItemFocused : style.input}
          type={label === 'Password' && !eyeOpen ? 'password' : 'text'}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={onChangeHandler}
        />
        {label === 'Password' && isFocused && eyeOpen && value && value.length > 0 && <EyeOutline className={style.eye} onClick={onClickEye} />}
        {label === 'Password' && isFocused && !eyeOpen && value && value.length > 0 && <EyeInvisibleOutline className={style.eye} onClick={onClickEye} />}
      </div>
    </div>
  );
};

Tinput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  length: PropTypes.number,
  onChange: PropTypes.func,
};

Tinput.defaultProps = {
  label: '',
  value: undefined,
  length: undefined,
  onChange: () => {},
};

export default Tinput;
