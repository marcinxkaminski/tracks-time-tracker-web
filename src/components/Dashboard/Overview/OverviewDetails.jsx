import React, { Component } from 'react'
import { TimeConverter } from '../../../utils/TimeConverter';

export default class OverviewDetails extends Component {
    render() {
        return (
            <div className="row justify-content-between mt-2 mb-5 pb-5">
                <div className="col-2 text-left borderRight">
                    <h6 className="title"><strong>Earned:</strong></h6>
                    <h6 className="title">{this.props.earned || 0}$</h6>
                </div>
                <div className="col-8 text-center">
                    <h2 className="title">Overview</h2>
                </div>
                <div className="col-2 text-right borderLeft">
                    <h6 className="title"><strong>Worked:</strong></h6>
                    <h6 className="title">{TimeConverter.getHoursPart(this.props.timeSpent)}h {TimeConverter.getMinutesPart(this.props.timeSpent)}m</h6>
                </div>
            </div>
        )
    }
}
