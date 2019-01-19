import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { RoutePaths } from './constants/RoutePaths';
import Entry from './containers/Entry/Entry';
import Dashboard from './containers/Dashboard/Dashboard';
import { Service } from './utils/Service';
import { DataManager } from './utils/DataManager';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false, data: null};
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(credentials, failureCallback){
    var setStateOfLogin = (loggedIn) => {
      if(loggedIn){
        this.setState({data: DataManager.getData()});
        this.setState({isLoggedIn: true});
        this.props.history.push(RoutePaths.OVERVIEW);
      }
    }
    Service.login(credentials, setStateOfLogin, failureCallback);
  }

  logout(){
    DataManager.logout();
    this.setState({isLoggedIn: false, data: null});
    this.props.history.push(RoutePaths.LOGIN);
  }

  componentWillMount(){
    const data = DataManager.getData();
    if(!data){
      this.props.history.push(RoutePaths.LOGIN);
    } else{
      this.props.history.push(RoutePaths.OVERVIEW);
    }
  }

  render() {
    return (
      <div id="main">
        <Route path={RoutePaths.ENTRY} component={() => <Entry {...this.props} login={this.login}/>} />
        <Route path={RoutePaths.DASHBOARD} component={() => <Dashboard {...this.props} logout={this.logout}/>} />
      </div>
    );
  }
}


export default withRouter(App);
