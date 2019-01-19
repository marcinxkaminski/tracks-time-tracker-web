import React, { Component } from 'react';
import { TimeConverter } from '../../../utils/TimeConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH as edit, faTrashAlt as remove } from '@fortawesome/free-solid-svg-icons';


export default class TaskTile extends Component {
  render() {
    const task = this.props.task;
    return (
      <div className="col">
        <button className={"tileWrapper taskTile " + (task.isActive ? 'activeTile' : '') + (task.state === 'closed' ? 'closedTile ' : '')}>
            <div onClick={() => this.props.show(task.id)} className="row justify-content-between mb-4" >
              {/* Name */}
              <div className="col-6 text-left">
                <h3 className="inline tileTitle">{task.name}</h3>
              </div>
              {/* Hours */}
              <div className="col-6 text-right">
                <h5 className="inline">{TimeConverter.getHoursPart(task.timeSpent)}h {TimeConverter.getMinutesPart(task.timeSpent)}min </h5>
              </div>
            </div>
          <div className="row justify-content-start mt-4">
            {/* Money */}
              <div onClick={() => this.props.show(task.id)} className="col-7 text-left" >
                <h5 id="moneyEarned">{(task.earned || 0) + '$'} </h5>
              </div>

            {/* Buttons */}
            <div className="col-5">
              <ul className="headerLinksList list-inline justify-content-end text-right p-0 m-0 tileSmallButtons">
                {this.props.edit ? <li className="list-inline-item px-1"><h6 className="tileLink" onClick={() => this.props.edit(task.id)}><FontAwesomeIcon icon={edit} /></h6></li> : '' }
                {this.props.remove ? <li className="list-inline-item px-1"><h6 className="tileLink" onClick={() => this.props.remove(task)}><FontAwesomeIcon icon={remove} /></h6></li> : '' }
              </ul>
            </div>
          </div>
        </button>
      </div>
    );
  }
}
