import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

import './Login.css';
import { setActiveUser, setErrorMessage, setUserToken, setUserEmail, showLoadingSpinner }  from '../../../actions';
import { secureStorage } from '../../../utils';

export class Login extends Component {
    componentDidMount(){
      let errorMessage = {message: "", show: false};
      this.props.setErrorMessage(errorMessage);
    }
    
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
    )
    .then((response) => {
      console.log(response)
      const {data:{message}} = response;

      if(message !== 'User is not verified'){
        const { token, user:{profile:{complete}},user} = response.data;
        const { setActiveUser, setUserToken, setUserEmail, setErrorMessage, history,showLoadingSpinner } = this.props;

        setActiveUser(user);
        setUserToken(token);
        secureStorage.setItem('token', {token});
        secureStorage.setItem('user', {user});
        secureStorage.setItem('email', {email});
        setUserEmail(email);

        showLoadingSpinner(false);

        let errorMessage = {message: "", show: false};
        setErrorMessage(errorMessage);
        complete ? history.push('/dashboard') : history.push({pathname:'/profile',search:email});
      }else{
        let errorMessage = {message: message, show: true};
        this.props.setErrorMessage(errorMessage);
        this.props.showLoadingSpinner(false);
      }
      
    })
    .catch((error) => {
      let theError = {message:error.message ,show:true}
      this.props.setErrorMessage(theError);
      this.props.showLoadingSpinner(true);
      this.props.showLoadingSpinner(false);
    });
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    if(!event.target.checkValidity()){
      this.props.setErrorMessage({message:'',show:true});
      return;
    }
    this.props.showLoadingSpinner(true);

    const form = event.target;
    const data = new FormData(form);

    let email = data.get('email');
    let password = data.get('password');

    this.signin(email , password);
  }

  render() {
    const { errorMessage, spinner } = this.props;
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
        {spinner ? <SpringSpinner color='#000000' size={parseInt('20')}/> : <button>LOGIN</button>}
        </form>
        {this.props.errorMessage.show ? this.props.errorMessage.message : null}
        <Link to="/register" >SIGN UP</Link>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { errorMessage, user ,spinner } = state;
  return { errorMessage, user, spinner };
}

const mapDispatchToProps = {
  setActiveUser,
  setUserToken,
  setErrorMessage,
  setUserEmail,
  showLoadingSpinner 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));