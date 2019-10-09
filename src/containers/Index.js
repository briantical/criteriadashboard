import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route , Redirect } from 'react-router-dom';
import { Login, Register,Profile, Dashboard , NoMatch} from './pages';

import { secureStorage } from '../utils';

const mapStateToProps = ( state , ownProps ={ } ) => {
  const { activeUser } = state;
  return { activeUser };
};

// returns { token: 'token' }
let token = secureStorage.getItem('token');

const Index = () => {
  return (
    <Switch>
      {/* Redirect all to the login page */}
      <Route exact path='/' render={()=>(
        token ? (<Dashboard/>) : (<Redirect to='/login'/>)
      )}/>
      {/* <Route path='/' component={ Dashboard }/> */}
      <Route path='/login' component={ Login }/>
      <Route path='/register' component={ Register }/>
      <Route path='/profile' component={ Profile }/>
      {/* Incase no match is found */}
      <Route component={ NoMatch }/>
    </Switch>
  );
}

export default connect(mapStateToProps)(Index);