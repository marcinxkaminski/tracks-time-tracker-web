import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { DataManager } from '../../utils/DataManager';
import { RoutePaths } from '../../constants/RoutePaths';
import ReminderForm from '../../components/Entry/Reminder/ReminderForm';
import { Service } from '../../utils/Service';

export default class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      isLoading: false,
    }

    this.remind = this.remind.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  remind(reminded) {
    if (reminded) {
      this.setState({ success: 'Successfully reminded :) Check your email.'})
    }
    else {
      this.setState({ error: 'Wrong email or an error occured. Please try again.' });
    }
  }

  onSubmit(credentials) {
    Service.remind(credentials, this.remind);
  }

  componentWillMount(){
    const data = DataManager.getData();
    if(data){
      this.setState({
        shouldRedirect: true
      });
    }
  }

  render() {
    const shouldRedirect = this.state.shouldRedirect;
    
    return shouldRedirect ? <Redirect to={RoutePaths.OVERVIEW}/> :
    (
      <div id="reminder" className="container-fluid">

        {this.state.error && <div className="row justify-content-center text-center"><div className="alert alert-danger alert-dismissible">
          <Link to="#" className="close" data-dismiss="alert" aria-label="close">&times;</Link>
          Ups. {this.state.error}</div></div>}

        <div className="row justify-content-center">
          <div className="col">
            <ReminderForm onSubmit={this.onSubmit}/>
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col text-center">
            <hr />
            <Link className="link" to={RoutePaths.REGISTER}>register</Link> / <Link className="link" to={RoutePaths.LOGIN}>login</Link>
          </div>
        </div>

      </div>
    );
  }
}
