import style from './index.module.css';
import calendar from '../../assets/calendar.svg';

export default () => (
  <div className={style.birthdayInput}>
    <div className={style.birthdaySubTitle}>Date of Birth</div>
    <div>
      <span className={style.birthdayPlaceholder}>Year/Month/Day</span>
      <img src={calendar} alt="calendar" className={style.calendarIcon} />
    </div>
  </div>
);
