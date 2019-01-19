import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { RoutePaths } from '../../constants/RoutePaths';
import FooterNavigation from '../../components/Dashboard/FooterNavigation';
import Footer from '../../components/Dashboard/Footer';
import Overview from '../Dashboard/Overview/Overview';
import Projects from './Projects/Projects';
import Project from './Projects/Project';
import AddProject from './Projects/AddProject';
import EditProject from './Projects/EditProject';
import Tasks from './Tasks/Tasks';
import Task from './Tasks/Task';
import AddTask from './Tasks/AddTask';
import EditTask from './Tasks/EditTask';
import { DataManager } from '../../utils/DataManager';

export default class Dashboard extends Component {
  componentWillMount(){
    if(!!!DataManager.getData()){
      this.props.history.push(RoutePaths.LOGIN);
    }
  }

  render() {
    const path = this.props.location ? this.props.location.pathname : '/';
    const pathSplittedOnSlash = path.split('/');
    const isInMainDashboard = path.includes('dashboard') && (pathSplittedOnSlash.length <= 3);
    const activeTab = isInMainDashboard ? pathSplittedOnSlash[2] : '';

    return (
      <div id="dashboard" className="container-fluid p-0">
        <Route exact={true} path={RoutePaths.OVERVIEW} component={() => <Overview {...this.props} />} />
        <Route exact={true} path={RoutePaths.PROJECT} component={() => <Project {...this.props} />} />
        <Route exact={true} path={RoutePaths.PROJECTS} component={() => <Projects {...this.props} />} />
        <Route exact={true} path={RoutePaths.PROJECT_ADD} component={() => <AddProject {...this.props} />} />
        <Route exact={true} path={RoutePaths.PROJECT_EDIT} component={() => <EditProject {...this.props} />} />
        <Route exact={true} path={RoutePaths.TASK} component={() => <Task {...this.props} />} />
        <Route exact={true} path={RoutePaths.TASKS} component={() => <Tasks {...this.props} />} />
        <Route exact={true} path={RoutePaths.TASK_ADD} component={() => <AddTask {...this.props} />} />
        <Route exact={true} path={RoutePaths.TASK_EDIT} component={() => <EditTask {...this.props} />} />
        <footer id="footer"> {isInMainDashboard ? <FooterNavigation active={activeTab}/> : <Footer />} </footer>
      </div>
    );
  }
}
