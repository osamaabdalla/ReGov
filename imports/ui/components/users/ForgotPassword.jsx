import React, { Component } from "react";
import { Form, Text } from "react-form";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Link, withRouter } from "react-router-dom";

import { Container } from "../../layouts/Container";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "alert alert-danger",
      message: "",
    };
  }

  _validateEmail(email) {
    if (email == undefined) {
      return "This field is required.";
    } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var test = re.test(email);
      if (test == false) return "Please enter a valid email.";
    }

    return undefined;
  }

  render() {
    const self = this;

    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#">ReGov</a>
          </div>
          <p>Please enter your email address. You will receive a link to create a new password via email.</p>
          <div className="login-box-body">
            {this.state.message ? (
              <div className={this.state.className}>{this.state.message}</div>
            ) : null}

            <Form
              onSubmit={(values) => {
                Accounts.forgotPassword({ email: values.email }, function (
                  error
                ) {
                  if (error) {
                    self.setState({
                      className: "alert alert-danger",
                      message: error.reason,
                    });
                  } else {
                    self.setState({
                      className: "alert alert-success",
                      message: "Please check your email.",
                    });
                  }
                });
              }}
              validate={({ email }) => {
                return {
                  email: this._validateEmail(email),
                };
              }}
            >
              {({ submitForm }) => {
                return (
                  <form onSubmit={submitForm}>
                    <div className="form-group">
                      <label>Email</label>
                      <Text field="email" className="form-control" />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-lg"
                    >
                      Get a new password
                    </button>
                  </form>
                );
              }}
            </Form>
          </div>
          <Link to="/login" className="btn btn-block btn-link">Login</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
