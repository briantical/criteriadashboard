import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import firebase from '../../../firebase';

import { setActiveUser ,setErrorMessage, setUserToken }  from '../../../actions';

const storageService = firebase.storage();
const storageRef = storageService.ref();

let selectedImage;
const avatar = "https://firebasestorage.googleapis.com/v0/b/criteria-66b60.appspot.com/o/avatar%2Favatar.png?alt=media&token=645c6238-0df7-4c7d-8417-7cb97b22c070";

export class Profile extends Component {
    //Complete the user profile
    complete = (...details) =>{
        const [ fullName , avatar, phoneNumber, userName, coordinates] = details;
        
        let data = {
            fullName,
            avatar,
            phoneNumber,
            userName,
            coordinates
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

    showImage = (src,target) =>{
        var fr = new FileReader();

        fr.onload = function(){
            target.src = fr.result;
        }
        fr.readAsDataURL(src.files[0]);
    }

    handleImageUploadChange = () =>{
        var src = document.getElementById("select_image");
        var target = document.getElementById("target");
        this.showImage(src, target);
    };

    //Upload the image to firebase and return the URL to the image
    uploadImage = () =>{
        const uploadTask = storageRef.child(`avatar/${selectedImage.name}`).put(selectedImage); 
        //create a child directory called images, and place the file inside this directory
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, () => {
            // Do something once upload is complete
            console.log('success');
        });
    };

    //Get the cuuurent location coordinates
    getAddress = () => {

    };

    success = (pos) => {
        let coordinates = pos.coords;
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
        
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
        
        let coordinates = navigator.geolocation.getCurrentPosition(this.success, this.error, options);
    
        this.complete(fullName , avatar, phoneNumber, userName, coordinates);
      };

    render() {
        const { errorMessage, history:{location:{search}}} = this.props;
        let email = search.slice(1,search.length);
        
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
                                <td>
                                    <div  id="imagesubmit">
                                    <input type="file" className="file-select" accept="image/*" onChange={this.handleImageUploadChange} id="select_image"/>
                                        <img 
                                            id="target"
                                            // src={avatar}
                                            className="rounded-circle rounded-sm" 
                                            style={{height:50,width:50,borderRadius:50}} 
                                            alt="profilepic"/>
                                    </div>
                                </td>
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
                                <td><input name="email" id="email" autoComplete="off" placeholder={email} readOnly/></td>
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
    return { user ,token,  errorMessage };
};

const mapDispatchToProps = {
    setActiveUser,
    setUserToken,
    setErrorMessage 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
