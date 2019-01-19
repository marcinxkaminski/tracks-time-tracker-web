import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import AddTaskForm from '../../../components/Dashboard/Tasks/AddTaskForm';
import { InitialTask } from '../../../constants/Task';
import { RoutePaths } from '../../../constants/RoutePaths';
export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(data) {
    DataManager.addTask(data);
    this.goBack();
  }

  goBack() {
    this.props.history.goBack();
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
      <div id="addTask" className="container">
        <Header elementsLeft={['back']} elementsRight={[]} goBack={this.goBack} />
        <AddTaskForm task={InitialTask.get()} projects={DataManager.getProjects()} onSubmit={this.onSubmit} />
      </div>
    )
  }
}
