import React from 'react';
import './Editcakemodal.css';

const cake = require('../../../../../assets/cake.png');
const Editcakemodal = (props) => {

    let updateCake = ()=>{
        props.editCake();
    }

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
    

    return (
        <div>
            <form
                    onSubmit={this.handleSubmit} 
                    noValidate 
                    className={errorMessage.show ? 'displayErrors' : ''}
                >
                <table>
                    <tbody>
                        <tr>
                            <td id="imageholder">
                                <div  id="imageholder">
                                    <img id="profile" name="profile" src={cake} className="theImage" alt="profilepic"/>
                                    <input type="file"  accept="image/*" onChange={this.handleImageUploadChange} id="select_image" required/>
                                </div>
                            </td>
                            <td>NAME:</td>
                            <td><input name="fullname" id="fullname" autoComplete="off" required/> </td>
                        </tr>
                        <tr>
                            <td>CATEGORY</td>
                            <td><input name="category" id="category" autoComplete="off" required/></td>
                        </tr>
                        <tr>
                            <td>DESCRIPTION</td>
                            <td><input name="description" id="description" autoComplete="off" required/></td>
                        </tr>
                        <tr>
                            <td>WEIGHT</td>
                            <td><input name="weight" id="weight" autoComplete="off" required/></td>
                        </tr>
                        <tr>
                            <td>COST</td>
                            <td><input name="cost" id="cost" autoComplete="off" required/></td>
                        </tr>
                        <tr>
                            <td>TIERS</td>
                            <td><input name="tier" id="tier" autoComplete="off" required/></td>
                        </tr>
                        <tr>
                            <td>FLAVOUR</td>
                            <td><input name="flavour" id="flavour" autoComplete="off" required/></td>
                        </tr>
                    </tbody>
                </table>
                <button>COMPLETE</button>
            </form>
        </div>
    )
}

export default Editcakemodal;