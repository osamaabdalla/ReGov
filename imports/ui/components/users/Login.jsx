import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { Container } from '../../layouts/Container';

class Login extends Component {
  constructor(props){
     super(props);
     this.state = {
         error: false,
         message: ''
     }
  }

  _validateEmail(email){
    if(email == undefined){
       return 'This field is required.';
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = re.test(email);
        if(test == false) return 'Please enter a valid email.';
    }
    return undefined;
  };

  render() {
    const self = this;
    return (
       <div className="login-page">
          <div className="login-box">
            <div className="login-logo">
              <p>ReGov Technologies</p>
             </div>
            <div className="login-box-body">
                { this.state.error ? <div className="alert alert-danger">{this.state.message}</div> : null }
                 <Form
                     onSubmit={(values) => {
                       Meteor.loginWithPassword(values.email, values.password, function(error){
                           if(error){
                              self.setState({
                                  error: true,
                                  message: error.reason
                              });
                              setTimeout(() => {
                                self.setState({
                                    error: false,
                                });
                              }, 5000);
                            } else {
                               self.props.history.push('/');
                            }
                       });
                     }}
                     validate={({ email, password }) => {
                       return {
                         email: this._validateEmail(email),
                         password: !password ? 'This field is required.' : undefined
                       }
                     }}
                   >
                     {({submitForm}) => {
                       return (
                         <form onSubmit={submitForm} >
                         <div className="form-group">
                           <label>Email</label>
                           <Text field="email" className="form-control" />
                         </div>
                         <div className="form-group">
                           <label>Password</label>
                           <Text field="password" className="form-control" type="password" />
                         </div>
                           <button type="submit"  className="btn btn-primary btn-block btn-lg">Login</button>
                           <Link to="/register" className="btn btn-info btn-block btn-lg">Register</Link>
                         </form>
                       )
                     }}
                   </Form>
              </div>
              <Link to="/forgot-password" className="btn btn-block btn-link">Lost your password?</Link>
          </div>
      </div>
    );
  }
}

export default withRouter(Login)
