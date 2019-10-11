import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';

import './Login.css';
import { setActiveUser, setErrorMessage, setUserToken, setUserEmail }  from '../../../actions';
import { secureStorage } from '../../../utils';

export class Login extends Component {
  
   signin = (email,password) =>{
    let params ={
      email,
      password
    };
    let options = {
      responseType: "json"
    };
    
    axios.post( 
      'http://localhost:3000/api/v1/auth/sign-in',
      params,
      options
    ).then((response) => {
      const { token, user:{profile:{complete}},user} = response.data;
      const { setActiveUser, setUserToken, setUserEmail, setErrorMessage, history } = this.props;

      setActiveUser(user);
      setUserToken(token);
      secureStorage.setItem('token', {token});
      setUserEmail(email);

      let errorMessage = {message: "", show: false};
      setErrorMessage(errorMessage);
      console.log('Login test')
      complete ? history.push('/') : history.push({pathname:'/profile',search:email});
      console.log('Login test')
    }).catch((error) => {
      let theError = {message:error ,show:true}
      this.props.setErrorMessage(theError);
    });
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    if(!event.target.checkValidity()){
      this.props.setErrorMessage({message:'',show:true});
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');

    this.signin(email , password);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div className='login'>
        <form 
          onSubmit={this.handleSubmit} 
          noValidate 
          className={errorMessage.show ? 'displayErrors' : ''}>
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
  const { errorMessage, user } = state;
  return { errorMessage, user };
}

const mapDispatchToProps = {
  setActiveUser,
  setUserToken,
  setErrorMessage,
  setUserEmail 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));