import React, { Component } from 'react';
import { TimeConverter } from '../../../utils/TimeConverter';

export default class ProjectDetails extends Component {

  render() {
    const project = this.props.project;

    return (
      <div id="projectDetails" className="row justify-content-center text-center mx-auto">
      <div className="col-8 justify-content-center borderBottomOrange">
        <h2 className="orangeColor"><strong>{project.name}</strong></h2>
        <h5 className="orangeColor"><strong>For: </strong>{project.for}</h5>
        <h6 className="orangeColor"><strong>Worked: </strong>{TimeConverter.getHoursPart(project.timeSpent)}h {TimeConverter.getMinutesPart(project.timeSpent)}m</h6>
        <h6 className="orangeColor"><strong>Earned: </strong>{project.earned}$</h6>
      </div>
    </div>
    )
  }
}
