import React, { Component } from 'react';
import FormButton from '../../common/FormButton';

export default class RegisterForm extends Component {
  constructor(props, onSubmit) {
    super(props, onSubmit);
    this.state = {
      name: '',
      surname: '',
      phone: '',
      email: '',
      defaultPricePerHour: 0,
      password: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  validateCredentials(credentials) {
    return credentials.name && credentials.surname && credentials.email && credentials.password;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="entryForm" onSubmit={(e) => { e.preventDefault(); this.props.onSubmit(this.state); }}>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="name" field="name" type="text" placeholder="Name" onChange={this.onChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="surname" field="surname" type="surname" placeholder="Surname" onChange={this.onChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="phone" field="phone" type="phone" placeholder="Phone" onChange={this.onChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="email" field="email" type="email" placeholder="Email" onChange={this.onChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="password" field="password" type="password" placeholder="Password" onChange={this.onChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="defaultPricePerHour" field="defaultPricePerHour" type="number" placeholder="$ per hour" onChange={this.onChange}/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col">
            <FormButton needValidation={({name: this.state.name, surname: this.state.surname, email: this.state.email, password: this.state.password })} name="update" />
          </div>
        </div>

      </form>
    );
  }
}
