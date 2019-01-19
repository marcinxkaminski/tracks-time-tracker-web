import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import EditTaskForm from '../../../components/Dashboard/Tasks/EditTaskForm';

export default class EditTask extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(data){
    DataManager.editTask(data);
    this.goBack();
  }

  getTask() {
    const match = this.props.location ? matchPath(this.props.location.pathname, {
      path: RoutePaths.TASK_EDIT,
      exact: true,
      strict: false
    }) : null;
    return match ? DataManager.getTask(match.params.id) : match;
  }

  goBack(){
    this.props.history.goBack();
  }
  
  componentWillMount(){
    this.setState({
      shouldRedirect: !!!DataManager.getData()
    });
  }

  render() {
    const task = this.getTask();
    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="editTask" className="container">
        <Header elementsLeft={['back']} elementsRight={[]} goBack={this.goBack}/>
        <EditTaskForm task={task} projects={DataManager.getProjects()} onSubmit={this.onSubmit}/>
      </div>
    );
  }
}
