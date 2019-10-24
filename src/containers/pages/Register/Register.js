import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';

import { setErrorMessage }  from '../../../actions';

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
      'http://localhost:3000/api/v1/auth/sign-up',
      params,
      options,
    ).then((response) => {
      console.log('The response' + JSON.stringify(response))
      const { data } = response;
      if(data.message !== "A user with the given username is already registered"){
        let errorMessage = {message: "", show: false};
        this.props.setErrorMessage(errorMessage);
        this.props.history.push('/login');
      }else{
        const {message} = data
        let errorMessage = {message, show: false};
        this.props.setErrorMessage(errorMessage);
      }
    })
    .catch((error) => {
      console.log('The error' + error)
      let message = error.response.data.message;
      let show = true;
      let theError = {message,show}
      this.props.setErrorMessage(theError);
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
      const form = event.target;
      const data = new FormData(form);
  
      let email = data.get('email');
      let password = data.get('password');
  
      this.signup(email , password);
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
            <button>SIGN UP</button>
            </form>
            
            <Link to="/login" >Login instead</Link>
            <p>{errorMessage.message}</p>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { errorMessage } = state;
    return {  errorMessage};
};

const mapDispatchToProps = {
    setErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
