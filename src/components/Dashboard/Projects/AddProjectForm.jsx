import React, { Component } from 'react';
import FormButton from '../../common/FormButton';
import DatePicker from '../../common/DatePicker';
import { TimeConverter } from '../../../utils/TimeConverter';

export default class AddProjectForm extends Component {
  constructor(props, project, onSubmit) {
    super(props, project, onSubmit);
    this.state = { ...this.props.project };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _onDateChange = (e) => {
    if (e.target.value) {
      const deadline = this.state.deadline;
      var newDeadline = {
        day: TimeConverter.getDayPart(deadline),
        month: TimeConverter.getMonthPart(deadline),
        year: TimeConverter.getYearPart(deadline)
      }
      newDeadline[e.target.name] = e.target.value;
      this.setState({ deadline: TimeConverter.createDate(newDeadline.year, newDeadline.month, newDeadline.day) });
    }
  }

  render() {
    return (
      <div className="row justify-content-center mt-5 pt-5 mb-5 pb-5">
        <div className="col-6">
          <form id="addProjectForm" className="text-center" onSubmit={e => { e.preventDefault(); this.props.onSubmit(this.state) }}>
            <div className="entryScreenSpacer"></div>

            <div className="form-row">
              <div className="form-group col text-center">
                <h1 className="formTitle">Add Project</h1>
              </div>
            </div>

            <div className="form-row p-1">
              <div className="form-group col text-left">
                <h6 className='title'>Name *</h6>
                <input className="inputField" name="name" type="text" placeholder="Name" onChange={e => { this.onChange(e) }} required />
              </div>
            </div>

            <div className="form-row p-1">
              <div className="form-group col text-left">
                <h6 className='title'>Deadline *</h6>
                <DatePicker onChange={this._onDateChange} day={TimeConverter.getDayPart(this.state.deadline)} month={TimeConverter.getMonthPart(this.state.deadline)} year={TimeConverter.getYearPart(this.state.deadline)} />
              </div>
            </div>

            <div className="form-row p-1">
              <div className="form-group col text-left">
                <h6 className='title'>Description *</h6>
                <input className="inputField" name="description" type="text" placeholder="Description" onChange={e => { this.onChange(e) }} required/>
              </div>
            </div>

            <div className="form-row p-1">
              <div className="form-group col text-left">
                <h6 className='title'>For *</h6>
                <input className="inputField" name="for" type="text" placeholder="For" onChange={e => { this.onChange(e) }} required/>
              </div>
            </div>

            <div className="form-row p-1">
              <div className="form-group col text-left">
                <h6 className='title'>Price per hour ($)</h6>
                <input className="inputField" name="pricePerHour" type="number" placeholder="$ per hour" onChange={e => { this.onChange(e) }} defaultValue={this.state.pricePerHour} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <FormButton needValidation={({ name: this.state.name, deadline: this.state.deadline, for: this.state.for, description: this.state.description })} name="add" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
