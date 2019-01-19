import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import ProjectDetails from '../../../components/Dashboard/Projects/ProjectDetails';
import TaskTile from '../../../components/Dashboard/Tasks/TaskTile';
import Share from '../../../components/common/Share';
import {InitialProject} from '../../../constants/Project';
export default class Project extends Component {
  edit = () => {
    this.props.history.push(RoutePaths.PROJECT_EDIT.replace(':id', this.state.project.id));
  }

  remove = () => {
    DataManager.removeProject(this.state.project);
    this.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  share = (email) => {
    DataManager.shareProject(this.state.project, email);
    this.toggleShare();
  }

  getProject = () => {
    const match = this.props.location ? matchPath(this.props.location.pathname, {
      path: RoutePaths.PROJECT,
      exact: true,
      strict: false
    }) : null;

    return match ? DataManager.getProject(match.params.id) : match;
  }

  onTileClick = (id) => {
    this.props.history.push(RoutePaths.TASK.replace(':id', id));
  }

  onEditClick = (id) => {
    this.props.history.push(RoutePaths.TASK_EDIT.replace(':id', id));
  }

  onRemoveClick = (task) => {
    DataManager.removeTask(task);
    this.setState({ tasks: DataManager.getTasks() });
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
      this.setState({project: this.getProject()});
    }
    
  }
  
  render() {
    const project = this.state.project || InitialProject.get();
    const shouldRedirect = this.state.shouldRedirect;
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="project" className="container-fluid mt-5 pt-5">
        <Header elementsLeft={['back']} elementsRight={['share', 'edit', 'remove']} share={this.toggleShare} goBack={this.goBack} edit={this.edit} remove={this.remove}/>
        <ProjectDetails project={project} onTileClick={this.onTileClick}/>
        <div className="row text-center mt-5">
          {project.tasks.map(task => task ? <TaskTile key={task.id} task={task} show={this.onTileClick} edit={this.onEditClick} remove={this.onRemoveClick} /> : null)}
        </div>
        {this.state.isShareModalOpen && <Share onSubmit={this.share} close={this.toggleShare}/>}
      </div>
    );
  }
}
