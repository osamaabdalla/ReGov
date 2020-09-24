import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Text } from 'react-form';
import Dropzone from 'react-dropzone';
import { createContainer } from 'meteor/react-meteor-data';
import { FeaturedImages } from '../../layouts/FeaturedImages';
import { Main } from '../../layouts/Main';
import { Content } from '../../layouts/Content';
import { PageHeader } from '../../layouts/PageHeader';
import '../../../api/media/images.js';

var self;
class EditUser extends Component {
  constructor(props){
     super(props);
     this.state = {
       error: false,
       message: "",
       username: "",
       email: "",
       firstName: "",
       lastName: "",
       identity: {
        preview:""
       },
       newPassword: ""
     }
     self = this;
  }

  componentDidMount(){
    setTimeout(function () {
      if(self.props){
        self.setState({
          username: self.props.user.username,
          email: self.props.user.emails[0].address,
          firstName: self.props.user.profile.firstName,
          lastName: self.props.user.profile.lastName,
          identity:  self.props.user.profile.identity
        });
      }
    }, 500);
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
    return (
      <Main>
        <PageHeader title="Edit Submission" />
        <Content>
          <div className="login-box-body">
          { this.state.message ? <div className={ this.state.error ? 'alert alert-danger' : 'alert alert-success'}>{this.state.message}</div> : null }
                 <Form
                    defaultValues={{
                        username: this.state.username,
                        email: this.state.email,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        identity: this.state.identity.preview,
                        newPassword: "",
                     }}
                     onSubmit={(values) => {
                      Meteor.call('updateUser', this.props.user._id, values, function(error, result){
                         if(error){
                            self.setState({ error: true, message: error.reason })
                         }
                         if(result){
                            self.props.history.push('/submissions', { message: 'User updated'});
                         }
                      });
                     }}
                     validate={({ username, email, firstName, passwordconfirm, password }) => {
                       return {
                         username: !username ? 'This field is required.' : undefined,
                         email: this._validateEmail(email),
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

                                <div className="form-group">
                                    <label>New Password </label>
                                    <Text field="newPassword" key={4} className="form-control" type="password" onChange={(event) => this.setState({ newPassword: event.target.value })} />
                                </div>

                                <div className="form-group">
                                    <button type="submit"  className="btn btn-primary btn-lg" >Update submissions</button>
                                </div>
                             </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label> <b style={{color:'red'}} >*</b>Passport / Identity Card </label>
                                    <FeaturedImages field="identity" key={6} onChange={(value) => setFieldValue('identity', value)} />
                                </div>
                            </div>

                            <div class="clearfix"></div>
                         </form>
                       )
                     }}
                   </Form>
                </div>
              </Content>
        </Main>
    );
  }
}

export default createContainer((params) => {
    Meteor.subscribe('users.all');
    return {
       loading: !Meteor.subscribe('users.all').ready(),
       user: Meteor.users.find({ _id: params.match.params.id }).fetch()[0],
    }
},
EditUser);