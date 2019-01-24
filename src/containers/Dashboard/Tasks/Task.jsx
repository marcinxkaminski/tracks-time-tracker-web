import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import TaskDetails from '../../../components/Dashboard/Tasks/TaskDetails';
import TaskTiming from '../../../components/Dashboard/Tasks/TaskTiming';
import Share from '../../../components/common/Share';
import {InitialTask} from '../../../constants/Task';

export default class Task extends Component {
  edit = () => {
    this.props.history.push(RoutePaths.TASK_EDIT.replace(':id', this.state.task.id));
  }

  remove = () => {
    DataManager.removeTask(this.state.task);
    this.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  share = (email) => {
    DataManager.shareTask(this.state.task, email);
    this.toggleShare();
  }

  getTask = () => {
    const match = this.props.location ? matchPath(this.props.location.pathname, {
      path: RoutePaths.TASK,
      exact: true,
      strict: false
    }) : null;

    return match ? DataManager.getTask(match.params.id) : match;
  }

  startWorking = (id) => {
    DataManager.startWorking({id});
  }

  addWorkingLog = (log) => {
    DataManager.addWorkingLog(log);
    this.setState({task: DataManager.getTask(log.id)});
  }

  toggleShare = () => {
    this.setState({isShareModalOpen: !!!this.state.isShareModalOpen});
  }

  componentWillMount(){
    const _shouldRedirect = !!!DataManager.getData();
    this.setState({
      shouldRedirect: _shouldRedirect
    });
    if(!_shouldRedirect){
      this.setState({task: this.getTask()});
    }
  }
  
  render() {
    const task = this.state.task || InitialTask.get();
    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="task" className="container-fluid mt-5 pt-5">
        <Header elementsLeft={['back']} elementsRight={['share', 'edit', 'remove']} share={this.toggleShare} goBack={this.goBack} edit={this.edit} remove={this.remove}/>
        <TaskDetails task={task} projectName={DataManager.getProjectName(task.projectId)}/>
        <TaskTiming {...this.props} task={task} startWorking={this.startWorking} addWorkingLog={this.addWorkingLog} />
        {this.state.isShareModalOpen && <Share onSubmit={this.share} close={this.toggleShare}/>}
      </div>
    );
  }
}
