import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { createContainer } from 'meteor/react-meteor-data';
import { Main } from '../../layouts/Main';
import { Content } from '../../layouts/Content';
import { PageHeader } from '../../layouts/PageHeader';

var self;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{}
    };
    self = this;
  }

  componentDidMount(){
    setTimeout(function () {
      var user = {
        _id: self.props.user._id,
        username: self.props.user.username,
        email: self.props.user.emails[0].address,
        firstName: self.props.user.profile.firstName,
        lastName: self.props.user.profile.lastName,
      }
      if(self.props){
        self.setState({user});
      }
    }, 500);
  }

  render() {
    const columns = [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: props => <div>
              {(!this.state.readonly)&&
                  <ul className="list-inline text-center">
                    <li><Link to={"/submissions/users/edit/" + props.value}>Edit</Link></li>
                    <li><Link to={{ pathname: '/submissions/users/delete' , state: props.original }} style={{color:'red'}} >Delete</Link></li>
                  </ul>
              }
        </div>
      }
    ]

    return (
      <Main>
        <PageHeader title="My Submissions" />
          <Content>
              {this.props.history.location.state != undefined ? <div className="alert alert-success">{this.props.history.location.state.message}</div> : null}
              <div className="box">
                <div className="box-body">
                  <ReactTable
                    data={[this.state.user]}
                    columns={columns}
                    filterable={false}
                    sortable={false}
                    resizable={false}
                    minRows={1}
                    className="-striped -highlight"
                  />
               </div>
            </div>
          </Content>
      </Main>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('userData');
  return {
     loading: !Meteor.subscribe('users.all').ready(),
     user: Meteor.subscribe('users.all').ready() ? Meteor.users.find({ _id: Meteor.userId()}).fetch()[0] : [],
  }
}, Dashboard);