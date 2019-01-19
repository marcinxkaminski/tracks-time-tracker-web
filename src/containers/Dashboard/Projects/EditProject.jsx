import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { RoutePaths } from '../../../constants/RoutePaths';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import EditProjectForm from '../../../components/Dashboard/Projects/EditProjectForm';

export default class EditProject extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(data){
    DataManager.editProject(data);
    this.goBack();
  }

  getProject() {
    const match = this.props.location ? matchPath(this.props.location.pathname, {
      path: RoutePaths.PROJECT_EDIT,
      exact: true,
      strict: false
    }) : null;

    return match ? DataManager.getProject(match.params.id) : match;
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
    const project = this.getProject();
    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.LOGIN}/> :
    (
      <div id="editProject" className="container">
        <Header elementsLeft={['back']} elementsRight={[]} goBack={this.goBack}/>
        <EditProjectForm project={project} projects={DataManager.getProjects()} onSubmit={this.onSubmit}/>
      </div>
    );
  }
}
