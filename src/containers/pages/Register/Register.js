import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

import { setErrorMessage , showLoadingSpinner}  from '../../../actions';

export class Register extends Component {
  componentDidMount(){
    let errorMessage = {message: "", show: false};
    this.props.setErrorMessage(errorMessage);
  }

    signup = (email,password) =>{
    let params ={
      email,
      password
    }
    let options = {
      responseType: "json"
    };
    
    axios.post( 
      `${process.env.REACT_APP_URL}/api/v1/auth/sign-up`,
      params,
      options,
    ).then((response) => {
      console.log('The response' + JSON.stringify(response))
      const { data } = response;
      if(data.message !== "A user with the given username is already registered"){
        let errorMessage = {message: "", show: false};
        this.props.setErrorMessage(errorMessage);
        this.props.showLoadingSpinner(false);
        this.props.history.push('/login');
      }else{
        const {message} = data
        let errorMessage = {message, show: false};
        this.props.setErrorMessage(errorMessage);
        this.props.showLoadingSpinner(false);
      }
    })
    .catch((error) => {
      console.log('The error' + error)
      let message = error.response.data.message;
      let show = true;
      let theError = {message,show}
      this.props.setErrorMessage(theError);
      this.props.showLoadingSpinner(false);
    });
  }

  handleSubmit = (event) =>{
      event.preventDefault();
      if(!event.target.checkValidity()){
        // form is invalid! so we do nothing
        let message="";
        let show=true;
        this.props.setErrorMessage({message,show});
        return;
      }

      this.props.showLoadingSpinner(true);
      const form = event.target;
      const data = new FormData(form);
  
      let email = data.get('email');
      let password = data.get('password');
  
      this.signup(email , password);
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
            {spinner ? <SpringSpinner color='#000000' size={parseInt('20')}/> : <button>SIGN UP</button>}
            </form>
            
            <Link to="/login" >Login instead</Link>
            <p>{errorMessage.message}</p>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { errorMessage, spinner } = state;
    return {  errorMessage, spinner};
};

const mapDispatchToProps = {
    setErrorMessage,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
