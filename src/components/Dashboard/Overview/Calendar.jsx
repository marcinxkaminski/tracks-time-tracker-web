import React, { Component } from 'react'
import { TimeConverter } from '../../../utils/TimeConverter';
import FormButton from '../../common/FormButton';

export default class Calendar extends Component {
    constructor(props, dateRange, onSubmit) {
        super(props, dateRange, onSubmit);
        const from = TimeConverter.getDatePart(this.props.dateRange.from);
        const to = TimeConverter.getDatePart(this.props.dateRange.to);
        this.state = {
            from: {
                day: TimeConverter.getDayPart(from),
                month: TimeConverter.getMonthPart(from),
                year: TimeConverter.getYearPart(from),
            },
            to: {
                day: TimeConverter.getDayPart(to),
                month: TimeConverter.getMonthPart(to),
                year: TimeConverter.getYearPart(to),
            }
        }
    }

    _getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate() || 31;
    }

    onChange = (e, rangeType) => {
        const currentState = this.state[rangeType];
        this.setState({[rangeType]:{ ...currentState, [e.target.name]: e.target.value }});
    }

    _maxDayFrom = () => {
        if(this.state.to.year === this.state.from.year && this.state.to.month === this.state.from.month){
            return this.state.to.day;
        } else {
            return this._getDaysInMonth(this.state.from.month, this.state.from.year) || 31;
        }
    }

    _maxMonthFrom(){
        if(this.state.to.year === this.state.from.year){
            return this.state.to.month;
        } else {
            return 12;
        }
    }

    _maxYearFrom(){
        return this.state.to.year || 2030;
    }

    _minDayTo(){
        if(this.state.to.year === this.state.from.year && this.state.to.month === this.state.from.month){
            return this.state.to.day;
        } else {
            return 1;
        }
    }

    _minMonthTo(){
        if(this.state.to.year === this.state.from.year){
            return this.state.to.month;
        } else {
            return 1;
        }
    }

    _minYearTo(){
        return this.state.from.year || 2018;
    }

    _mapStateToDate = () => {
        return {
            from: TimeConverter.createDate(this.state.from.year, this.state.from.month, this.state.from.day),
            to: TimeConverter.createDate(this.state.to.year, this.state.to.month, this.state.to.day)
        }
    }

    render() {
        return (
            <div id="modalWrapper" className='noBlur'>
                <div id="modal">
                    <div className="row justify-content-end mb-3"><div className="col text-right link" onClick={this.props.close}>X</div></div>
                    <form id="calendar" className="text-center" onSubmit={e => { e.preventDefault(); this.props.onSubmit(this._mapStateToDate()) }}>
                        <div className="form-row my-3">
                            <div className="form-group col">
                                <h6 className="formFieldTitle"><strong>From:</strong></h6>
                            </div>
                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Year </h6>
                                <input className="inputField" name="year" type="number" placeholder="Year" min="2018" max={this._maxYearFrom()} defaultValue={this.state.from.year} onChange={e => { this.onChange(e, 'from') }} required pattern="[2018-2020]" />
                            </div>

                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Month </h6>
                                <input className="inputField" name="month" type="number" placeholder="Month" min="1" max={this._maxMonthFrom()} defaultValue={this.state.from.month} onChange={e => { this.onChange(e, 'from') }} required pattern="[1-12]" />
                            </div>

                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Day </h6>
                                <input className="inputField" name="day" type="number" placeholder="Day" min="1" max={this._maxDayFrom()} defaultValue={this.state.from.day} onChange={e => { this.onChange(e, 'from') }} required pattern="[1-31]" />
                            </div>
                        </div>

                        <div className="form-row my-3">
                            <div className="form-group col">
                                <h6 className="formFieldTitle"><strong>To:</strong></h6>
                            </div>
                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Year </h6>
                                <input className="inputField" name="year" type="number" placeholder="Year" min={this._minYearTo()} max="2030" defaultValue={this.state.to.year} onChange={e => { this.onChange(e, 'to') }} required pattern="[2018-2020]" />
                            </div>

                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Month </h6>
                                <input className="inputField" name="month" type="number" placeholder="Month" min={this._minMonthTo()} max="12" defaultValue={this.state.to.month} onChange={e => { this.onChange(e, 'to') }} required pattern="[1-12]" />
                            </div>

                            <div className="form-group col">
                                <h6 className="formFieldTitle"> Day </h6>
                                <input className="inputField" name="day" type="number" placeholder="Day" min={this._minDayTo()} max={this._getDaysInMonth(this.state.to.month, this.state.to.year)} defaultValue={this.state.to.day} onChange={e => { this.onChange(e, 'to') }} required pattern="[1-31]" />
                            </div>
                        </div>

                        <div className="form-row my-5">
                            <div className="form-group col">
                                <FormButton needValidation={({ ...this.state.from, ...this.state.to})} name="update date range" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
