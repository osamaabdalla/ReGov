import React, { Component } from 'react';
export default class NotFound extends Component {
  render() {
    return (
      <div className="error-page">
        <div className="container">
          <h2 className="headline text-yellow"> 404 </h2>
          <div className="error-content">
            <h3><i className="fa fa-warning text-yellow"></i>Oops! Page not found.</h3>
            <p>The page you were looking for could not be found. You may return to the <a href="../../"> home page </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
