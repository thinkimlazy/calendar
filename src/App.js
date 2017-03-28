import React, {Component} from 'react';
import Calendar, { monthNames } from './Calendar';
import AddColorDay from './AddColorDay';


const numRe = /^\d*$/;
class App extends Component {
  state = {
    height: 400,
    width: 600,
    selectedDay: null,
    selectedMonth: null,
    modifiedDays: [{date:'24.03.2017', color:'#0f0'}, {date:'26.03.2017', color:'#00f'}],
  };

  handleHeightChange = e => {
    const value = e.target.value;
    if (numRe.test(value)) this.setState({ height: parseInt(value, 10) || 0})
  };

  handleWidthChange = e => {
    const value = e.target.value;
    if (numRe.test(value)) this.setState({ width: parseInt(value, 10) || 0})
  };

  addColorDay = (day) => this.setState({ modifiedDays: this.state.modifiedDays.concat(day)});

  handleDayChange = day => {
    console.log(`selected day ${day}`);
    this.setState({ selectedDay: day })
  };

  deleteColorDay = i => {
    console.log(i, this.state.modifiedDays);
    // concat потому что создает новый массив, т.к. splice изменяет существующий массив
    // а react состояние компонента никогда не меняется напрямую
    const days = this.state.modifiedDays.concat();
    days.splice(i, 1);
    this.setState({
      modifiedDays: days
    });
  };

  handleMonthChange = month => {
    console.log(`current month ${monthNames[month.getMonth()]}`);
    this.setState({ selectedMonth: month })
  };

  render() {
    const { modifiedDays, selectedDay } = this.state;
    const coloredDaysList = this.state.modifiedDays.map(({ date, color }, i) => {
      const onClick = () => this.deleteColorDay(i);
      return (
        <div className="col-xs-1" key={i}>{date}:
          <div style={{ color }}>{color} </div>
          <button onClick={onClick} className="btn btn-xs btn-danger">Delete</button>
        </div>
      );
    });

		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="panel panel-info">
              <div className="panel-heading">Размеры контейнера</div>
              <div className="panel-body">
                <div className="input-group">
                  <span className="input-group-addon">Height</span>
                  <input type="text" className="form-control" value={this.state.height} onChange={this.handleHeightChange} />
                  <span className="input-group-addon">px</span>
                </div>
                <div className="input-group">
                  <span className="input-group-addon">Width</span>
                  <input type="text" className="form-control" value={this.state.width} onChange={this.handleWidthChange} />
                  <span className="input-group-addon">px</span>
                </div>
              </div>

              <div className="panel-heading">Дата и месяц</div>
              <div className="panel-body">
                Выбранная дата: {this.state.selectedDay &&
                `${selectedDay.getDate()}.${selectedDay.getMonth()}.${selectedDay.getFullYear()}`}
                <br />
                Месяц: {this.state.selectedMonth && monthNames[this.state.selectedMonth.getMonth()]}
              </div>

            </div>

          </div>

          <div className="col-md-9">
            <div className="panel panel-info">
              <div className="panel-heading">Цветные дни</div>
              <div className="panel-body">
                <div className="row">
                  {coloredDaysList}
                </div>
              </div>

              <div className="panel-heading">Добавить цветной день</div>
              <div className="panel-body">
                <AddColorDay submitColorDay={this.addColorDay}/>
              </div>
            </div>
          </div>
        </div>

        {/* Календарь */}
        <div style={{ width: this.state.width, height: this.state.height }}>
          <Calendar
            modifiedDays={modifiedDays}
            selectedDay={selectedDay}
            onDayClick={this.handleDayChange}
            onMonthChange={this.handleMonthChange}
          />
        </div>
      </div>
		);
	}
}

export default (App);
