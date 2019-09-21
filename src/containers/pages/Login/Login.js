import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';

import './Login.css';
import { setActiveUserToken }  from '../../../actions'

export class Login extends Component {
  constructor() {
      super()
      this.state ={
        displayErrors : false
      }
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
      this.props.history.push('/');
    }).catch((error) => {
      console.log(error)
    });
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    if(!event.target.checkValidity()){
      // form is invalid! so we do nothing
      this.setState({displayErrors : true})
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');

    this.signin(email , password);
  }

  render() {
    const { displayErrors } = this.state;
    return (
      <div className='login'>
        <form 
          onSubmit={this.handleSubmit} 
          noValidate 
          className={displayErrors ? 'displayErrors' : ''}>
        <table>
          <tbody>
            <tr>
              <td>
              Email :
              </td>
              <td>
                <input type="email" placeholder="jondoe@gmail.com" name="email" id="email" autoComplete="off" required/>
              </td>
            </tr>
            <tr>
              <td>
                Password :
              </td>
              <td>
                <input type="password" name="password" id="password" required/>
              </td>
            </tr>
            </tbody>
        </table>
        <button>LOGIN</button>
        </form>
        
        <Link to="/register" >SIGN UP</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));