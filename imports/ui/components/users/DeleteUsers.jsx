import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../layouts/Container';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import { Footer } from '../../layouts/Footer';
import { Main } from '../../layouts/Main';
import { Content } from '../../layouts/Content';
import { PageHeader } from '../../layouts/PageHeader';

class DeleteUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
        error: false,
        message: ''
    }
  }

  _deleteUsers(){
    const self = this;
    id = this.props.location.state._id;
    Meteor.call('deleteUser', id, function(error, result){
       if(error){
          self.setState({
             error: true,
             message: error.reason
          });
       }
       if(result) {
         self.props.history.replace('/login');
       }
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Sidebar />
            <Main>
                <PageHeader title="Delete submission"  />
                <Content>
                    { this.state.error ? <div className="alert alert-danger">{this.state.message}</div> : null }
                    <br/><p>Are you sure ?</p><br/>
                    <button type="button" className="btn btn-danger" onClick={()=> this._deleteUsers()}>Yes, delete</button>
                    <div class="clearfix"></div>
                    <br></br>
                    <Link to="/submissions" className="btn btn-primary">Back</Link>
                </Content>
            </Main>
          <Footer />
      </Container>
    );
  }
}

export default DeleteUsers;
