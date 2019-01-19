import React, { Component } from 'react'

export default class DatePicker extends Component {
    _getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate() || 31;
    }

    render() {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const currentDay = date.getDate();
        return (
            <div className="datePicker row">
                <div className="col">
                    <h6 className="formFieldTitle"> Year </h6>
                    <input className="inputField" name="year" type="number" placeholder="Year" min={currentYear} max="2030" defaultValue={this.props.year || currentYear} onChange={e => { this.props.onChange(e) }} required pattern="[2018-2020]" />
                </div>

                <div className="col">
                    <h6 className="formFieldTitle"> Month </h6>
                    <input className="inputField" name="month" type="number" placeholder="Month" min="1" max="12" defaultValue={this.props.month || currentMonth} onChange={e => { this.props.onChange(e) }} required pattern="[1-12]" />
                </div>

                <div className="col">
                    <h6 className="formFieldTitle"> Day </h6>
                    <input className="inputField" name="day" type="number" placeholder="Day" min={1} max={this._getDaysInMonth(this.props.month, this.props.year)} defaultValue={this.props.day || currentDay} onChange={e => { this.props.onChange(e) }} required pattern="[1-31]" />
                </div>
            </div>
        )
    }
}
