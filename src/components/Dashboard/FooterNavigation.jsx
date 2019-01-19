import React, {Component} from 'react';
import { RoutePaths } from '../../constants/RoutePaths';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTachometerAlt, faClipboardList, faTasks} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

export default class FooterNav extends Component {
  render() {
    return (
      <nav className="navbar px-5">
        <Link to={RoutePaths.OVERVIEW} ><button className={'buttonNav ' + (this.props.active === 'overview' ? 'buttonNavActive' : '')} type="button"><FontAwesomeIcon icon={faTachometerAlt} /></button></Link>
        <Link to={RoutePaths.PROJECTS}><button className={'buttonNav ' + (this.props.active === 'projects' ? 'buttonNavActive' : '')} type="button"><FontAwesomeIcon icon={faClipboardList} /></button></Link>
        <Link to={RoutePaths.TASKS}><button className={'buttonNav ' + (this.props.active === 'tasks' ? 'buttonNavActive' : '')} type="button"><FontAwesomeIcon icon={faTasks} /></button></Link>
      </nav>
    );
  }
}
