import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { DataManager } from '../../../utils/DataManager';
import Header from '../../../components/Dashboard/Header';
import AddProjectForm from '../../../components/Dashboard/Projects/AddProjectForm';
import { InitialProject } from '../../../constants/Project';
import { RoutePaths } from '../../../constants/RoutePaths';
export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onSubmit(data) {
    DataManager.addProject(data);
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
      <div id="addProject" className="container">
        <Header elementsLeft={['back']} elementsRight={[]} goBack={this.goBack} />
        <AddProjectForm project={InitialProject.get()} onSubmit={this.onSubmit} />
      </div>
    )
  }
}
