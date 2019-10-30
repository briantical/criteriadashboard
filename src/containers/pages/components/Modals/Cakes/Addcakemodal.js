import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';
import { setErrorMessage, showLoadingSpinner, addNewCategory, removeCategory } from '../../../../../actions';
import { firebase,pusher, secureStorage } from '../../../../../utils';

import './Cakemodal.css';

const cake_image = require('../../../../../assets/cake.png')

const storageService = firebase.storage();
const storageRef = storageService.ref();

export class Addcakemodal extends Component {

    componentDidMount(){
        this.channel = pusher.subscribe('categories');
        this.channel.bind('inserted', this.insertCategory);
        this.channel.bind('deleted', this.deleteCategory);
    }

    insertCategory = (category) =>{
        this.props.addNewCategory(category.category);
    }

    deleteCategory = (category) =>{
        this.props.removeCategory(category);
    }

    addCategory = () =>{
        let name = document.getElementById('category').value;
        let description =document.getElementById('category').value;

        
        let data = {
            name,
            description,
        };

        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.post(
            'http://localhost:3000/api/v1/category/',
            data,
            {headers},
            options
        ).then(() => {
            console.log('Successfully added')

            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
            this.props.showLoadingSpinner(false);
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
            this.props.showLoadingSpinner(false);
        });
    }

    removeCategory = (event) =>{
        const form = event.target;
        const data = new FormData(form);

        let category_id = data.get('category').value;
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.delete(
            `http://localhost:3000/api/v1/category/${category_id}`,
            {headers},
            options
        ).then(() => {
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
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
                            .child(`image/${Date.now()+'.png'}`)
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

    handleOnClick = (event) =>{
        event.stopPropagation();
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

        this.props.showLoadingSpinner(true);

        let categoryname = document.getElementById('category').value;
        let fullcategory = this.props.categories.find(category => category.name !== categoryname);
        let category = fullcategory._id;
    
        let name = data.get('name');
        let description = data.get('description');
        let cost = data.get('cost');
        let weight = data.get('weight');
        let shape = data.get('shape');
        let tiers = data.get('tiers');
        let flavour = data.get('flavour');
        let image = document.getElementById('profile').src;    
        
        const {hideModal,modalprops:{addNewCake}} = this.props;
        
        addNewCake({name, category,description,image,flavour,weight,cost,shape,tiers});
        hideModal()
    };

    render() {
        const {categories,hideModal,errorMessage, spinner} =this.props;
        console.log(categories)
        return (
            <div className="addcakemodal" onClick={hideModal}>
                <div className="modaltable" onClick={this.handleOnClick}>
                    <form
                        onSubmit={this.handleSubmit} 
                        noValidate 
                        className={errorMessage.show ? 'displayErrors' : ''}
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="imageholder">
                                            <img id="profile" name="profile" src={cake_image} className="theImage" alt="profilepic"/>
                                            <input type="file"  accept="image/*" onChange={this.handleImageUploadChange} id="select_image" required/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>NAME:</td>
                                    <td><input type="text" id="name" name="name"  autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>CATEGORY:</td>
                                    <td>
                                        <input type="text" name="category" id="category" list="categories" required/>
                                        <datalist id="categories">
                                            {
                                                categories.map((category)=><option value={category.name} key={category._id}/>)
                                            }
                                        </datalist>
                                    </td>
                                    <td>
                                        <div className="addCategory" onClick={this.addCategory}>+</div>
                                    </td>
                                    <td>
                                        <div className="removeCategory" onClick={this.removeCategory}>-</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>DESCRIPTION:</td>
                                    <td><input type="text" id="description" name="description" autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>COST:</td>
                                    <td><input type="number" id="cost" name="cost" autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>WEIGHT:</td>
                                    <td><input type="number" id="weight" name="weight" autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>SHAPE:</td>
                                    <td><input type="text" id="shape" name="shape" autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>TIERS:</td>
                                    <td><input type="number" id="tiers" name="tiers" autoComplete="off" required/></td>
                                </tr>
                                <tr>
                                    <td>FLAVOUR:</td>
                                    <td><input type="text" id="flavour" name="flavour" autoComplete="off" required/></td>
                                </tr>
                            </tbody>
                        </table>
                        {spinner ? <SpringSpinner color='#000000' size={parseInt('20')}/> : <button>COMPLETE</button>}
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { errorMessage, categories, spinner } = state;
    return { errorMessage, categories, spinner }; 
}

const mapDispatchToProps = {
    setErrorMessage, 
    showLoadingSpinner,
    addNewCategory,
    removeCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Addcakemodal)