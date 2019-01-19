import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import Header from '../../../components/Dashboard/Header';
import ProjectTile from '../../../components/Dashboard/Projects/ProjectTile';
import { DataManager } from '../../../utils/DataManager';
export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: DataManager.getProjects() }
    this.onTileClick = this.onTileClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onTileClick(id) {
    this.props.history.push(RoutePaths.PROJECT.replace(':id', id));
  }

  onEditClick(id) {
    this.props.history.push(RoutePaths.PROJECT_EDIT.replace(':id', id));
  }

  onRemoveClick(project) {
    DataManager.removeProject(project);
    this.setState({ projects: DataManager.getProjects() });
  }

  onAddClick() {
    this.props.history.push(RoutePaths.PROJECT_ADD);
  }

  componentWillMount(){
    this.setState({
      shouldRedirect: !!!DataManager.getData()
    });
  }
  
  render() {
    const projects = this.state.projects;

    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="projects" className="container-fluid my-5 py-5">
        <Header elementsLeft={[]} elementsRight={['add']} add={this.onAddClick} />
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2 className="title">Projects</h2>
          </div>
        </div>
        <div className="row jutify-content-center text-center">
          {projects.map(project => project ? <ProjectTile key={project.id} project={project} show={this.onTileClick} edit={this.onEditClick} remove={this.onRemoveClick} /> : null)}
        </div>
      </div>
    );
  }
}
