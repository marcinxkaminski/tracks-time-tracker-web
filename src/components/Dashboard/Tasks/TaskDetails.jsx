import React, { Component } from 'react'

export default class TaskDetails extends Component {
  render() {
    return (
      <div id="taskDetails" className="row justify-content-center text-center mx-auto">
        <div className="col-8 justify-content-center borderBottom">
          <h2 className="title"><strong>{this.props.task.name}</strong></h2>
          <h5 className="title"><strong>Project:</strong> {this.props.projectName} </h5>
          <h6 className="title"><strong>For: </strong>{this.props.task.for}</h6>
        </div>
      </div>
    )
  }
}
