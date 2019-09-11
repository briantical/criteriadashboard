import React from 'react';
import { connect } from 'react-redux';
import './Main.css';

import { Switch, Route , Redirect } from 'react-router-dom';
import { Login, Register,Profile, Dashboard , NoMatch} from './views/pages';

import { setActiveUserId } from '../actions'

const mapStateToProps = ( state , ownProps ={ } ) => {
  const { activeUser } = state;
  return { activeUser };
};

const mapDispatchToProps = {
  setActiveUserId
}

const Main = (props) => {
  return (
    <Switch>
      {/* Redirect all to the login page */}
      <Route exact path='/' render={()=>(
        props.activeUser ? (<Dashboard/>) : (<Redirect to='/login'/>)
      )}/>
      <Route path='/login' component={ Login }/>
      <Route path='/register' component={ Register }/>
      <Route path='/profile' component={ Profile }/>
      {/* Incase no match is found */}
      <Route component={ NoMatch }/>
    </Switch>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
