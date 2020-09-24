import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { FeaturedImages } from '../../layouts/FeaturedImages';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';

var self;
class RegisterNewUser extends Component {
  constructor(props){
     super(props);
     this.state = {
         error: false,
         message: '',
         username: '',
         identity: '',
         email: '',
         firstName: '',
         lastName: '',
         password: '',
         passwordconfirm: '',
     }
     self = this;
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

  valuesChanges(val) {
    this.setState({
      email: val.email,
      firstName: val.firstName,
      lastName: val.lastName,
      identity: val.identity,
      password: val.password,
      passwordconfirm: val.passwordconfirm,
      username: val.username,
    });
  }

  render() {
    return (
      <div className="register-page">
        <div className="register-box">
          <div className="login-logo">
            <p>Register</p>
          </div>
          <div className="login-box-body">
            { this.state.error ? <div className="alert alert-danger">{this.state.message}</div> : null }
            <Form
              onChange={(data) => self.valuesChanges(data.values)}
                defaultValues={{
                  username: this.state.username,
                  email: this.state.email,
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  identity: this.state.identity,
                  password: this.state.password,
                  passwordconfirm: this.state.passwordconfirm,
                }}
                onSubmit={(values) => {
                  var userdata = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    identity: this.state.identity,
                  }
                  Meteor.call('insertUser', userdata, function(error, result){
                      if(error){
                        self.setState({ error: true, message: error.reason });
                        setTimeout(() => {
                          self.setState({
                              error: false,
                          });
                        }, 5000);
                      }
                      if(result){
                        self.props.history.push('/login', { message: 'User registered successfully'});
                      }
                  });
                }}
                validate={({ username, email, firstName, passwordconfirm, password }) => {
                  return {
                    username: !username ? 'This field is required.' : undefined,
                    email: this._validateEmail(email),
                    password: !password ? 'This field is required.' : undefined,
                    passwordconfirm: password !== passwordconfirm ? "Password confirm doesn't match." : undefined,
                    firstName: !firstName ? 'This field is required.' : undefined
                  }
                }}
              >
                  {({values, submitForm, setFieldValue}) => {
                       return (
                         <form onSubmit={submitForm} >
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>First Name </label>
                                    <Text field="firstName" key={0} className="form-control" onChange={(event) => this.setState({ firstName: event.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label>Last Name </label>
                                    <Text field="lastName" key={0} className="form-control" onChange={(event) => this.setState({ lastName: event.target.value })} />
                                </div>

                                <div className="form-group">
                                  <label> <b style={{color:'red'}} >*</b>Username </label>
                                  <Text field="username" key={1} className="form-control" onChange={(event) => this.setState({username: event.target.value })} />
                                </div>

                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>Email </label>
                                    <Text field="email" key={2} className="form-control" onChange={(event) => this.setState({ email: event.target.value })} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>Passport / Identity Card </label>
                                    <FeaturedImages field="identity" key={6} onChange={(value) => setFieldValue('identity', value)} />
                                </div>
                            </div>

                            <div class="clearfix"></div>
                            <div className="col-md-12"></div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>Password </label>
                                    <Text field="password" key={4} className="form-control" type="password" onChange={(event) => this.setState({ password: event.target.value })} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>Password Confirm</label>
                                    <Text field="passwordconfirm" key={5} className="form-control" type="password" onChange={(event) => this.setState({ passwordconfirm: event.target.value })} />
                                </div>
                            </div>

                            <div class="clearfix"></div>
                              <div className="col-md-12">
                                <button type="submit"  className="btn btn-primary btn-lg" >Submit</button>
                              </div>
                            <div class="clearfix"></div>
                         </form>
                       )
                     }}
                   </Form>
                </div>
                <div class="clearfix"></div>
                <div className="col-md-12">
                  <Link to="/login" className="btn btn-link">{"  < "} Back to login</Link>
                </div>
          </div>
      </div>
    );
  }
}

export default createContainer((params) => {return {}}, RegisterNewUser);