import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { DataManager } from '../../utils/DataManager';
import { RoutePaths } from '../../constants/RoutePaths';
import { Service } from '../../utils/Service';
import RegisterForm from '../../components/Entry/Register/RegisterForm';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      isLoading: false,
    }

  }

  register = (registred) => {
    if (registred) {
      this.setState({ success: 'Successfully registred. We have sent you an email. Please confirm your registration.'});
    }
    else {
      this.setState({ error: 'There was a problem with registration. Please try again.' });
    }
  }

  onSubmit = (credentials) => {
    Service.register(credentials, this.register);
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
      <div id="register" className="container-fluid">

        {this.state.error && <div className="row justify-content-center text-center"><div className="alert alert-danger alert-dismissible">
          <Link to="#" className="close" data-dismiss="alert" aria-label="close">&times;</Link>
          Ups. {this.state.error}</div></div>}

        <div className="row justify-content-center my-3">
          <div className="col">
            {this.state.success ? <div className="row justify-content-center text-center"><div className="alert alert-success alert-dismissible">
              <Link to="#" className="close" data-dismiss="alert" aria-label="close">&times;</Link>
              {this.state.success}</div></div> : <RegisterForm onSubmit={this.onSubmit}/>}
          </div>
        </div>

        <div className="row justify-content-center my-3">
          <div className="col text-center">
            <hr />
            or <Link className="link" to={RoutePaths.LOGIN}>login</Link>
          </div>
        </div>
      </div>
    );
  }
}
