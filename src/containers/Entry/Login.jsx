import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { DataManager } from '../../utils/DataManager';
import { RoutePaths } from '../../constants/RoutePaths';
import LoginForm from '../../components/Entry/Login/LoginForm';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isLoading: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.displayError = this.displayError.bind(this);
  }

  displayError(){
    this.setState({error: 'Wrong email or password. Try again.'});
  }

  onSubmit(credentials) {
    this.props.login(credentials, this.displayError);
  }

  onChange(){
    if(this.state.error){
      this.setState({error: ''});
    }
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
      <div id="login" className="container-fluid">

        {this.state.error && <div className="row justify-content-center text-center"><div className="alert alert-danger alert-dismissible">
          Ups. {this.state.error}</div></div>}

        <div className="row justify-content-center">
          <div className="col text-center">
            <LoginForm onSubmit={this.onSubmit} onChange={this.onChange}/>
            <Link className="link" to={RoutePaths.REMINDER}>forgotten password?</Link>
          </div>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col text-center">
            <hr />
            or <Link className="link" to={RoutePaths.REGISTER}>register</Link>
          </div>
        </div>

      </div>
    );
  }
}
