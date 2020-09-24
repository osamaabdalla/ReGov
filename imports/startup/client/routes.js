import { Meteor } from 'meteor/meteor';
import React from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

// route components
import Dashboard from '../../ui/components/general/Dashboard';
import NotFound from '../../ui/components/general/NotFound';
import RegisterNewUser from '../../ui/components/users/RegisterNewUser';
import EditUser from '../../ui/components/users/EditUser';
import DeleteUsers from '../../ui/components/users/DeleteUsers';
import ForgotPassword from '../../ui/components/users/ForgotPassword';
import Login from '../../ui/components/users/Login';
import { Container } from '../../ui/layouts/Container';
import Header from '../../ui/layouts/Header';
import Sidebar from '../../ui/layouts/Sidebar';
import { Footer } from '../../ui/layouts/Footer';

const AppRoutes = ({ match }) =>  (
    <div>
        <Container>
            <Header />
            <Sidebar />
            <Route exact path={match.url} component={Dashboard}/>
            <Route exact path={match.url + "/users/edit/:id"} component={EditUser}/>
            <Route exact path={match.url + "/users/delete"} component={DeleteUsers}/>
            <Footer />
       </Container>
    </div>
)

export const renderRoutes = () => (
  <BrowserRouter >
    <div>
    <Switch>
          <Redirect exact from="/" to="/submissions" />
          <Route path="/submissions" render={ (props) => {
              if (Meteor.user() === null) {
                return (<Redirect to="/login" />)
              } else {
                return (<AppRoutes {...props} />)
              }
            }}
           />
          <Route path="/login" render={ (props) => {
                  if (Meteor.user() === null) {
                    return (<Login />)
                  } else {
                    return (<Redirect to="/submissions" />)
                  }
            }}
            />
          <Route path="/register" render={ (props) => {
                  if (Meteor.user() === null) {
                    return (<RegisterNewUser {...props} />)
                  } else {
                    return (<Redirect to="/submissions" />)
                  }
            }}
            />
            <Route path="/forgot-password" render={ (props) => {
                    if (Meteor.user() === null) {
                      return (<ForgotPassword />)
                    } else {
                      return (<Redirect to="/submissions" />)
                    }
              }}
              />
          <Route path="/404" component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
    </div>
  </BrowserRouter>
);
