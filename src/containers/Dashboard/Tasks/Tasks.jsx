import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import Header from '../../../components/Dashboard/Header';
import TaskTile from '../../../components/Dashboard/Tasks/TaskTile';
import { DataManager } from '../../../utils/DataManager';

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: DataManager.getTasks() }
    this.onTileClick = this.onTileClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onTileClick(id) {
    this.props.history.push(RoutePaths.TASK.replace(':id', id));
  }

  onEditClick(id) {
    this.props.history.push(RoutePaths.TASK_EDIT.replace(':id', id));
  }

  onRemoveClick(task) {
    DataManager.removeTask(task);
    this.setState({ tasks: DataManager.getTasks() });
  }

  onAddClick() {
    this.props.history.push(RoutePaths.TASK_ADD);
  }

  componentWillMount(){
    this.setState({
      shouldRedirect: !!!DataManager.getData()
    });
  }

  render() {
    const tasks = this.state.tasks;

    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="tasks" className="container-fluid my-5 py-5">
        <Header elementsLeft={[]} elementsRight={['add']} add={this.onAddClick} />
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2 className="title">Tasks</h2>
          </div>
        </div>
        <div className="row jutify-content-center text-center">
          {tasks.map(task => task ? <TaskTile key={task.id} task={task} show={this.onTileClick} edit={this.onEditClick} remove={this.onRemoveClick} /> : null)}
        </div>
      </div>
    );
  }
}
