import React, {Component, PropTypes} from 'react';


export default class AddColorDay extends Component {
  static propTypes = {
    submitColorDay: PropTypes.func.isRequired,
  };

  state = {
    date: '22.03.2017',
    color: '#f0e'
  };

  handleDateChange = e => this.setState({ date: e.target.value});

  handleColorChange = e => this.setState({ color: e.target.value });

  handleSubmit = () => {
    const { submitColorDay } = this.props;
    const { date, color } = this.state;
    submitColorDay({
      date,
      color
    });
    this.setState({
      date: '',
      color: ''
    })
  };

  render() {
    return (
      <div className="form">
        <div className="form-group">
          <label htmlFor="date">Дата (формат:DD.MM.YYYY)</label>
          <input type="text" id="date" className="form-control" value={this.state.date} onChange={this.handleDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="color">Цвет (#fff, #e15d55, red)</label>
          <input type="text" className="form-control" id="color" value={this.state.color} onChange={this.handleColorChange} />
        </div>
        <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Добавить</button>
      </div>
    );
  }
}
