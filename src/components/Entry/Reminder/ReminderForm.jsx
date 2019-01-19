import React, { Component } from 'react';
import FormButton from '../../common/FormButton';

export default class ReminderForm extends Component {
  constructor(props, onSubmit) {
    super(props, onSubmit);
    this.state = {
      email: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <form className="entryForm" onSubmit={(e) => {e.preventDefault(); this.props.onSubmit(this.state)}}>

        <div className="form-row">
          <div className="form-group col">
            <input className="inputField" name="email" field="email" type="email" placeholder="Email" onChange={e => { this.onChange(e) }} required />
          </div>
        </div>

        <div className="form-row">
        <div className="form-group col">
          <FormButton needValidation={this.state} name="remind"/>
        </div>
      </div>


      </form>
    );
  }
}
