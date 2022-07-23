import { useState } from 'react';
import { DatePicker } from 'antd-mobile';
import moment from 'moment';
import PropTypes from 'prop-types';
import style from './index.module.scss';
import calendar from '../../assets/calendar.svg';

const DateInput = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const onClickDatePicker = () => {
    setVisible(true);
  };
  return (
    <>
      <DatePicker
        visible={visible}
        onClose={() => { setVisible(false); }}
        onConfirm={(val) => { onChange(moment(val).format('YYYY-MM-DD')); }}
        style={style.datepicker}
      />
      <div className={style.birthdayInput} onClick={onClickDatePicker}>
        <div className={style.birthdaySubTitle}>Date of Birth</div>
        <div>
          <span className={style.birthdayPlaceholder}>{value ? moment(value).format('YYYY/MM/DD') : 'Year/Month/Day'}</span>
          <img src={calendar} alt="calendar" className={style.calendarIcon} />
        </div>
      </div>
    </>
  );
};

DateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
