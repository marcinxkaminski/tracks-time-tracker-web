import React, { Component } from 'react';
import logo from '../../static/images/logo.svg';
import { Route } from 'react-router-dom';
import { RoutePaths } from '../../constants/RoutePaths';
import Login from './Login';
import Register from './Register';
import Reminder from './Reminder';

export default class Entry extends Component {
  render() {
    return (
      <div id="entryScreen" className="container">
        <div className="topSpacerToMiddle"></div>
        <div className="row justify-content-center my-5">
          <div className="col text-center">
            <img className="entryLogo" src={logo} alt="Tracks"></img>
          </div>
        </div>
        <Route exact={true} path={RoutePaths.LOGIN} component={() => <Login {...this.props} />} />
        <Route exact={true} path={RoutePaths.REGISTER} component={() => <Register {...this.props} />} />
        <Route exact={true} path={RoutePaths.REMINDER} component={() => <Reminder {...this.props} />} />
      </div>
    );
  }
}
