import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { DataManager } from '../../../utils/DataManager';
import { RoutePaths } from '../../../constants/RoutePaths';
import { TimeConverter } from '../../../utils/TimeConverter';
import Header from '../../../components/Dashboard/Header';
import Calendar from '../../../components/Dashboard/Overview/Calendar';
import Settings from '../../../components/Dashboard/Overview/Settings';
import OverviewDetails from '../../../components/Dashboard/Overview/OverviewDetails';
import ProjectTile from '../../../components/Dashboard/Projects/ProjectTile';
import TaskTile from '../../../components/Dashboard/Tasks/TaskTile';

export default class Overview extends Component {
  constructor(props) {
    super(props);
    const daily = DataManager.getDailyOverview();
    this.state = {
      daily: daily,
      dateRange: {from: TimeConverter.getTodaysDateWithoutTime(), to: TimeConverter.getTodaysDateWithoutTime()},
      modalCalendarOpened: false,
      modalSettingsOpened: false,
    };
  }

  toggleModal = (modalType) => {
    switch (modalType) {
      case 'calendar':
        this.setState(prevState => ({ modalCalendarOpened: !prevState.modalCalendarOpened }));
        break;

      case 'settings':
        this.setState(prevState => ({ modalSettingsOpened: !prevState.modalSettingsOpened }));
        break;
      
      default:
        break;
    }
  }

  updateOverview = () => {
    const daily = DataManager.getDailyOverview(this.state.dateRange);
    this.setState({
      daily: daily
    })
  }

  onSettingsClick = () => {
    this.toggleModal('settings');
  }

  onSettingsSubmit = (settings) => {
    this.toggleModal('settings');
    DataManager.setUserDetails(settings);
  }

  onCalendarClick = () => {
    this.toggleModal('calendar');
  }

  onCalendarSubmit = (newDateRange) => {
    const daily = DataManager.getDailyOverview(newDateRange);
    this.setState({
      dateRange: newDateRange,
      daily: daily
    })
    this.toggleModal('calendar');
  }

  onTaskTileClick = (id) => {
    this.props.history.push(RoutePaths.TASK.replace(':id', id));
  }

  onProjectTileClick = (id) => {
    this.props.history.push(RoutePaths.PROJECT.replace(':id', id));
  }

  componentWillMount(){
    this.setState({
      shouldRedirect: !!!DataManager.getData()
    });
  }

  render() {
    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="overview" className="container-fluid my-5 py-5">
        <div className={this.state.modalCalendarOpened || this.state.modalSettingsOpened ? 'blur' : ''}>
          <Header elementsLeft={['calendar']} elementsRight={['settings', 'logout']} calendar={this.onCalendarClick} logout={this.props.logout} settings={this.onSettingsClick} />
          <OverviewDetails earned={this.state.daily.earned} timeSpent={this.state.daily.timeSpent} />
          <hr/>
          <div className='row justify-content-center'>
            <div className="col-12 text-left"><h4 className='title'><small>Daily Projects</small></h4></div>
            <ul>
              {this.state.daily.projects.map(project => project ? <li key={project.id} className="list-inline-item"><ProjectTile key={project.id} project={project} show={this.onProjectTileClick}/></li> : null)}
            </ul>
          </div>
          <hr />
          <div className='row justify-content-center'>
            <div className="col-12 text-left"><h4 className='title'><small>Daily Tasks</small></h4></div>
            <ul>
              {this.state.daily.tasks.map(task => task ? <li key={task.id} className="list-inline-item"><TaskTile key={task.id} task={task} show={this.onTaskTileClick}/></li> : null)}
            </ul>
          </div>
        </div>

        {this.state.modalCalendarOpened && <Calendar close={this.onCalendarClick} dateRange={this.state.dateRange} onSubmit={this.onCalendarSubmit} />}
        {this.state.modalSettingsOpened && <Settings close={this.onSettingsClick} data={DataManager.getUserDetails()} onSubmit={this.onSettingsSubmit} />}
      </div>
    );
  }
}
