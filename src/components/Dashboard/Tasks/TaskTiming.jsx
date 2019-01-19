import React, { Component } from 'react';
import { TimeConverter } from '../../../utils/TimeConverter';
import { DataManager } from '../../../utils/DataManager';
import TimingButton from '../../../components/common/TimingButton';

export default class TaskTiming extends Component {
  constructor(props) {
    super(props);
    const timeDiff = DataManager.getTmpWorkingLog(this.props.task.id);
    this.state = {
      timeSpent: this.props.task.timeSpent + timeDiff,
      time: timeDiff,
      running: timeDiff ? true : false
    }
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  startTimer() {
    this.setState({
      running: true
    });
    this.timer = setInterval(this.countUp, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.setState({
      running: false
    });
  }

  countUp() {
    this.setState({
      time: this.state.time + 1,
      timeSpent: this.state.timeSpent + 1
    });
  }

  _onClick() {
    if (this.state.running === false) {
      this.props.startWorking(this.props.task.id);
      this.startTimer();
      DataManager.editTask({...this.props.task, isActive: true });
    }
    else if(this.state.running === true){
      this.stopTimer();
      this.props.addWorkingLog({"id": this.props.task.id, "start": TimeConverter.getTodaysDate(), "timeSpent": this.state.time});
      DataManager.editTask({...this.props.task, isActive: false });
    }
  }

  componentWillUnmount(){
    if(this.state.running === true){
      DataManager.saveTmpWorkingLog(this.props.task.id, this.state.time);
    }
  }

  componentDidMount(){
    if(this.state.running === true){
      this.startTimer();
    }
  }

  render() {
    return (
      <div id="taskTiming">
        <div className="row justify-content-center text-center my-5">
          <div className="col-4 borderRight">
            <h5 className='title'><strong>Time Spent:</strong> {TimeConverter.getHoursPart(this.state.timeSpent)}h {TimeConverter.getMinutesPart(this.state.timeSpent)}min {TimeConverter.getSecondsPart(this.state.timeSpent)}s</h5>
            <h6 className='title'><strong>Earned: </strong> {TimeConverter.getMoneyEarned(this.state.timeSpent, this.props.task.pricePerHour)}$ </h6>
          </div>
          <div className="col-4"><TimingButton onClick={this._onClick} running={this.state.running}/></div>
        </div>

        <div className="row justify-content-center">
          <table className="col-8 table table-hover text-center title">
            <thead>
              <tr>
                <th className='w-25'>Date</th>
                <th className='w-25'>Time</th>
                <th className='w-25'>Earned</th>
              </tr>
            </thead>
            <tbody>
              {this.props.task.working.map(day =>
              day.timeSpent > 0 ?
                <tr key={day.start}>
                  <td className='w-25'>{TimeConverter.getDatePart(day.start)}</td>
                  <td className='w-25'>{TimeConverter.getHoursPart(day.timeSpent)}h {TimeConverter.getMinutesPart(day.timeSpent)}m {TimeConverter.getSecondsPart(day.timeSpent)}s</td>
                  <td className='w-25'>{TimeConverter.getMoneyEarned(day.timeSpent, this.props.task.pricePerHour) + '$'}</td>
                </tr> : null)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
