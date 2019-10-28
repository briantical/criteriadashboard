import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

import './Profile.css';

import { setActiveUser ,setErrorMessage, setUserToken, showLoadingSpinner }  from '../../../actions';
import { firebase, secureStorage }  from '../../../utils';

const storageService = firebase.storage();
const storageRef = storageService.ref();

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.REACT_APP_GOOGLE_MAPS_API
  });

const avatar = require('../../../assets/avatar.png');

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
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
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
            this.props.showLoadingSpinner(false);
            //Persist the user and token in state
            this.props.setActiveUser(user);
            secureStorage.setItem('token', {token});
            //Redirect the user to the homepage of login page,
            this.props.history.push('/');
        }).catch((error) => {
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
            this.props.showLoadingSpinner(false);
        });
    };
 
    handleImageUploadChange = () =>{
        let src = document.getElementById("select_image");
        let profile = document.getElementById("profile");
        this.uploadImage(src, profile);
    };

    //Upload the image to firebase and return the URL to the image
    //create a child directory called images, and place the file inside this directory
    uploadImage = (src,profile) =>{
        let selectedImage = src.files[0];
        const uploadTask = storageRef
                            .child(`avatar/${Date.now()+'.png'}`)
                            .put(selectedImage); 
        
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            (progress !== 100) ? this.props.showLoadingSpinner(true) : this.props.showLoadingSpinner(false);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('Unknown state');
                    break;
            }
        }, (error) => {
            // Handle unsuccessful uploads
            console.log('error' + error);  
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then((downloadURL) => {
                    //Get the uploaded image's url and set it as the src
                    let reader = new FileReader();
                    reader.onload = function(){
                        profile.src = downloadURL;
                    }
                    reader.readAsDataURL(src.files[0]);
            })
        })
        uploadTask
            .then(()=>console.log('sucessfully uploaded the user image'))
            .catch((error)=>this.props.setErrorMessage(error))
    };

    handleSubmit = (event) =>{
        event.preventDefault();
        if(!event.target.checkValidity()){
          let message="";
          let show=true;
          this.props.setErrorMessage({message,show});
          return;
        }

        this.props.showLoadingSpinner(true);

        const form = event.target;
        const data = new FormData(form);
    
        let fullName = data.get('fullname');
        let address = data.get('address');
        let avatar = document.getElementById('profile').src;    
        let phoneNumber = data.get('phonenumber');
        let userName = data.get('username');

        // Geocode an address.
        googleMapsClient.geocode({
            address
        }, (err, response) => {
            if (!err) {
                let data = response.json.results
                if (Array.isArray(data) || data.length) {
                    // array does exist, is  an array, or is not empty
                    let address = data[0];
                    const {geometry:{location:{lat,lng}}} = address;

                    let coordinates = [ lat, lng];
                    this.complete(fullName , avatar, phoneNumber, userName, coordinates);
                  }
            }
        });
      };

    render() {
        const { spinner, errorMessage, history:{location:{search}}} = this.props;
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
                                    <div  id="imageholder">
                                        <img id="profile" name="profile" src={avatar} className="theImage" alt="profilepic"/>
                                        <input type="file"  accept="image/*" onChange={this.handleImageUploadChange} id="select_image" required/>
                                    </div>
                                </td>
                                <td>NAME:</td>
                                <td><input name="fullname" id="fullname" autoComplete="off" required/></td>
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
                    {spinner ? <SpringSpinner color='#000000' size={parseInt('20')}/> : <button>COMPLETE</button>}
                </form>
                {this.props.errorMessage.message}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, token, errorMessage, spinner } = state;
    return { user ,token,  errorMessage, spinner };
};

const mapDispatchToProps = {
    setActiveUser,
    setUserToken,
    setErrorMessage,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))