import React, { Component } from 'react';
import { TimeConverter } from '../../../utils/TimeConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH as edit, faTrashAlt as remove } from '@fortawesome/free-solid-svg-icons';


export default class ProjectTile extends Component {
  render() {
    const project = this.props.project;
    return (
      <div className="col">
        <button className={"tileWrapper projectTile " + (project.state === 'closed' ? 'closedTile ' : '')}>
          <div className="row justify-content-between mb-4" onClick={() => this.props.show(project.id)}>
            {/* Name */}
            <div className="col-6 text-left">
              <h3 className="inline tileTitle">{project.name}</h3>
            </div>
            {/* Hours */}
            <div className="col-6 text-right">
              <h5 className="inline">{TimeConverter.getHoursPart(project.timeSpent)}h {TimeConverter.getMinutesPart(project.timeSpent)}min </h5>
            </div>
          </div>
          <div className="row justify-content-start mt-4">
            {/* Money */}
            <div className="col-7 text-left" onClick={() => this.props.show(project.id)}>
              <h5 id="moneyEarned">{(project.earned || 0) + '$'} </h5>
            </div>

            {/* Buttons */}
            <div className="col-5">
              <ul className="headerLinksList list-inline justify-content-end text-right p-0 m-0 tileSmallButtons">
                <li className="list-inline-item px-1"><h6 className="tileLink" onClick={() => this.props.edit(project.id)}><FontAwesomeIcon icon={edit} /></h6></li>
                <li className="list-inline-item px-1"><h6 className="tileLink" onClick={() => this.props.remove(project)}><FontAwesomeIcon icon={remove} /></h6></li>
              </ul>
            </div>
          </div>
        </button>
      </div>
    );
  }
}
