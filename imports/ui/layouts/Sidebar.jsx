import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SideNav, { Nav, NavIcon, NavText } from "react-sidenav";

export default class Sidebar extends Component {
  componentDidMount() {}

  render() {
    return (
      <aside className="main-sidebar" style={{ position: "absolute" }}>
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <NavLink activeClassName="active" to="/submissions">
                <i className="fa fa-file"></i> <span>Submissions</span>
              </NavLink>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
