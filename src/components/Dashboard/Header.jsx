import React, {Component} from 'react';
import logo from '../../static/images/logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShareSquare as share, faCogs as settings, faSlidersH as edit, faTrashAlt as remove, faPlus as add, faSignOutAlt as logout, faCalendarAlt as calendar, faChevronLeft as back} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  createListElement(name) {
    const icons = {
      'settings': settings,
      'edit': edit,
      'remove': remove,
      'add': add,
      'logout': logout,
      'calendar': calendar,
      'share': share,
      'back': back,
    };

    const functions = {
      'settings': this.props.settings,
      'edit': this.props.edit,
      'remove': this.props.remove,
      'add': this.props.add,
      'logout': this.props.logout,
      'calendar': this.props.calendar,
      'share': this.props.share,
      'back': this.props.goBack,
    }

    return (<li key={name} className="list-inline-item px-1"><button className="headerButton" onClick={functions[name]}><FontAwesomeIcon icon={icons[name]} /></button></li>);
  }

  render() {
    return (
      <div id="header" className="container-fluid">
        <div className="row justify-content-center">
          <ul className="headerButtonsList col list-inline justify-content-start text-left m-0">
            {this.props.elementsLeft.map(item => this.createListElement(item))}
          </ul>
          <div className="col text-center"><Link to="/dashboard/overview"><img id="headerLogo" className="img-fluid" src={logo} alt="Tracks"></img></Link></div>
          <ul className="headerButtonsList col justify-content-end text-right list-inline">
            {this.props.elementsRight.map(item => this.createListElement(item))}
          </ul>
        </div>
      </div>
    );
  }
}
