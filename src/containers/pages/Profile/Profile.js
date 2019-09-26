import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { setActiveUser ,setErrorMessage, setUserToken }  from '../../../actions';

export class Profile extends Component {
    //Complete the user profile
    complete = (...details) =>{
        const [ fullName , avatar, phoneNumber, userName, address] = details;
        
        let data = {
            fullName,
            avatar,
            phoneNumber,
            userName,
            address
        };
        
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }

        axios.put(
            'http://localhost:3000/api/v1/user/update',
            data,
            {headers},
            options
        ).then((response) => {
            const { token, user} = response.data;
            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
            //Persist the user and token in state
            this.props.setActiveUser(user);
            localStorage.setItem('userToken',token);
            //Redirect the user to the homepage of login page,
            this.props.history.push('/');
        }).catch((error) => {
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
    };

    //Upload the image to firebase and return the URL to the image
    uploadImage = () =>{

    };

    //Get the cuuurent location coordinates
    getAddress = () => {

    };

    success = (pos) => {
        let coordinates = pos.coords;
      
        console.log('Your current position is:');
        console.log(`More or less ${coordinates.accuracy} meters.`);

        return [coordinates.latitude, coordinates.longitude];
    }

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      

    handleSubmit = (event) =>{
        event.preventDefault();
        if(!event.target.checkValidity()){
          let message="";
          let show=true;
          this.props.setErrorMessage({message,show});
          return;
        }
        const form = event.target;
        const data = new FormData(form);
    
        let fullName = data.get('fullname');
        let avatar = data.get('avatar');
        let phoneNumber = data.get('phonenumber');
        let userName = data.get('username');
        // let address = data.get('address');

        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
        
          
        let address = navigator.geolocation.getCurrentPosition(this.success, this.error, options);
    
        this.complete(fullName , avatar, phoneNumber, userName, address);
      };

    render() {
        const { user , errorMessage } = this.props;
        const { email} = user || '';
        return (
            <div>
                <p>COMPLETE PROFILE PAGE</p>
                <form
                    onSubmit={this.handleSubmit} 
                    noValidate 
                    className={errorMessage.show ? 'displayErrors' : ''}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td><img src={require ("../../../assets/MOI.jpg")} className="rounded-circle rounded-sm" style={{height:50,width:50}} alt="profilepic"/></td>
                                <td>NAME:</td>
                                <td><input name="fullname" id="fullname" autoComplete="off" required/> </td>
                            </tr>
                            <tr>
                                <td>USERNAME</td>
                                <td><input name="username" id="username" autoComplete="off" required/></td>
                            </tr>
                            <tr>
                                <td>ADDRESS</td>
                                <td><input name="address" id="address" autoComplete="off" required/></td>
                            </tr>
                            <tr>
                                <td>EMAIL</td>
                                <td><input name="email" id="email" autoComplete="off" value={email} readOnly/></td>
                            </tr>
                            <tr>
                                <td>PHONE NUMBER</td>
                                <td><input name="phonenumber" id="phonenumber" autoComplete="off" required/></td>
                            </tr>
                        </tbody>
                    </table>
                    <button>COMPLETE</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, token, errorMessage } = state;
    return { user ,token,  errorMessage }
};

const mapDispatchToProps = {
    setActiveUser,
    setUserToken,
    setErrorMessage 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
