import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import './Login.css';
import { setActiveUserToken }  from '../../../actions'

export class Login extends Component {
  componentDidMount() {
      //this.signin();
  }

   signin = (email,password) =>{
    let params ={
      email,
      password
    }
    
    axios.post( 
      'http://localhost:3000/api/v1/auth/sign-in',
      params
    ).then((response) => {
      this.props.setActiveUserToken(response.data.token);
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <div className='login container-fluid'>
        <Spinner animation="grow" role="status" size="sm" style={{color:'#4F0B0C'}}>
          <span className="sr-only">Loading...</span>
        </Spinner>
        {this.props.activeUser}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { activeUser } = state;
  return { activeUser };
}

const mapDispatchToProps = {
  setActiveUserToken    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);