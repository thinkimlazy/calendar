import React, {Component, PropTypes} from 'react';
import { getFirstDayOfMonth, getSunday, getMonday, getLastDayOfMonth, isSameDayOrBefore, getNextDay, isSameMonth, isSameDay, addMonths } from './utils';

import './Calendar.css'

export const monthNames = 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_');

export default class Calendar extends Component {
  static propTypes = {
    selectedDay: PropTypes.instanceOf(Date),
    onDayClick: PropTypes.func,
    onMonthChange: PropTypes.func,
    modifiedDays: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    )
  };

  static defaultProps = {
    modifiedDays: []
  };

	state = {
		month: getFirstDayOfMonth(new Date()),
	};

	nextMonth = () => {
    const month =  getFirstDayOfMonth(addMonths(this.state.month, 1));
    if (this.props.onMonthChange) this.props.onMonthChange(month);
    this.setState({ month })
  };

  previousMonth = () => {
    const month =  getFirstDayOfMonth(addMonths(this.state.month, -1));
    if (this.props.onMonthChange) this.props.onMonthChange(month);
    this.setState({ month })
  };

  handleDayClick = date => {
    if (this.props.onDayClick) this.props.onDayClick(date)
  };


  renderTableRows() {
    const { modifiedDays, selectedDay } = this.props;
    // Date objects that will be rendered in the month
    const dates = [];

    const lastSunday = getSunday(getLastDayOfMonth(this.state.month));

    // init value is monday in the first week of the month
    for(let iterDay = getMonday(this.state.month); isSameDayOrBefore(iterDay, lastSunday); iterDay = getNextDay(iterDay)) {
      dates.push(iterDay);
    }

    // rows that represents week, contain date objects
    const rows = [];
    const daysInTheWeek = 7;
    for (let i = 0; i < dates.length; i += daysInTheWeek) {
      rows.push(dates.slice(i,i + daysInTheWeek));
    }

    // table row elements
    return rows.map((row, i) => {
      const days = row.map(date => {
        // если использовать isSameDay(...) && 'class', то false преобразуется в класс 'false'
        const selectedCls = selectedDay && isSameDay(selectedDay, date) ? 'calendar__month_selected-day' : '';
        const outerCls = !isSameMonth(this.state.month, date) ? 'calendar__month_outer-day' : '';
        const dayCls = `${outerCls} ${selectedCls}`;

        const modifyColor = modifiedDays.reduce((acc, modifiedDate) => {
          // 'DD.MM.YYYY' -> 'YYYY-MM-DD' iso format
          const modifiedISODate = modifiedDate.date.split('.').reverse().join('-');
          const modifiedDateObj = new Date(modifiedISODate);
          if (isSameDay(modifiedDateObj, date)) return modifiedDate.color;
          return acc;
        }, null);

        const onClick = () => this.handleDayClick(date);
        return (
          <td
            key={date.getTime()}
            className={dayCls}
            onClick={onClick}
            style={{ backgroundColor: modifyColor }}
          >
            {date.getDate()}
          </td>
        );
      });
      return <tr key={this.state.month.getTime + i}>{days}</tr>
    });
  }

  render() {
		return (
			<div className="calendar">
				{/* Navbar */}
				<div className="calendar__navbar">
					<span
            className="calendar__navbar__arrow calendar__navbar__arrow-left glyphicon glyphicon-menu-left"
            onClick={this.previousMonth}
          >
          </span>
          {`${monthNames[this.state.month.getMonth()]} ${this.state.month.getFullYear()}`}
          <span
            className="calendar__navbar__arrow calendar__navbar__arrow-right glyphicon glyphicon-menu-right"
            onClick={this.nextMonth}
          >
          </span>
        </div>
				{/* Month */}
				<table className="table table-bordered table-condensed calendar__month">
					<thead>
						<tr>
							<th>ПН</th>
							<th>ВТ</th>
							<th>СР</th>
							<th>ЧТ</th>
							<th>ПТ</th>
							<th>СБ</th>
							<th>ВС</th>
						</tr>
					</thead>
					<tbody>
            {this.renderTableRows()}
					</tbody>
				</table>
			</div>
		);
	}
}
