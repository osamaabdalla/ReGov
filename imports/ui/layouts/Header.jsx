import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Link, withRouter, withHistory } from "react-router-dom";
import { createContainer } from "meteor/react-meteor-data";

var self;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    self = this;
  }

  componentWillMount() {
    Meteor.call("currentUserInfo", null, function (error, result) {
      if (error) //console.log(error);
      if (result) self.setState({ username: result.username });
    });
  }

  _logOut(e) {
    e.preventDefault();
    Meteor.logout();
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <header className="main-header">
        <Link to="/" className="logo"><span className="logo-lg">ReGov</span></Link>
        <nav className="navbar navbar-static-top" role="navigation">
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="offcanvas"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="user user-menu">
                <a href="#" onClick={(e) => this._logOut(e)} >Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe("userData");
  return {
    loading: !Meteor.subscribe("users.all").ready(),
    user: Meteor.subscribe("users.all").ready()
      ? Meteor.users.find({ _id: Meteor.userId() }).fetch()[0]
      : [],
  };
}, Header);
