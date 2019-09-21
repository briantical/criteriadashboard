import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';

export class Register extends Component {
    constructor() {
        super()
        this.state ={
          displayErrors : false
        }
    }
  
     signup = (email,password) =>{
      let params ={
        email,
        password
      }
      
      axios.post( 
        'http://localhost:3000/api/v1/auth/sign-up',
        params
      ).then((response) => {
        this.props.history.push('/login');
      }).catch((error) => {
        console.log('Error' + error)
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
    
        this.signup(email , password);
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
            <button>SIGN UP</button>
            </form>
            
            <Link to="/login" >Login instead</Link>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { activeUser } = state;
    return { activeUser };
};

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
