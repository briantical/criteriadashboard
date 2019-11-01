import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

//Import created components
import { secureStorage, pusher, firebase } from '../../../../../../utils';
import { 
    setErrorMessage, 
    setAvailableAddons, 
    addNewAddon, 
    removeAddon, 
    updateAddon ,
    setCategories, 
    setModalVisibility, 
    showLoadingSpinner
} from '../../../../../../actions';
import Tiles from './Tiles/Tiles';
import { addaddonmodal } from '../../../../../../constants/modals';

//import the css file
import './Addons.css';

//Declare all file constants
const storageService = firebase.storage();

export class Addons extends Component {

    constructor(props){
        super(props)
        this.getAddons();
        this.getCategories();
    }

    componentDidMount(){
        this.channel = pusher.subscribe('addons');
        this.channel.bind('inserted', this.insertAddon);
        this.channel.bind('deleted', this.deleteAddon);
        this.channel.bind('updated', this.updateAddon);
    }

    insertAddon = (addon) =>{
        this.props.addNewAddon(addon.addon);
    }

    deleteAddon = (addon) =>{
        this.props.removeAddon(addon);
    }

    updateAddon = (addon) =>{
        this.props.updateAddon(addon.addon);
    }

    showAddModal = () =>{
        let addNewAddon = (...arg) =>this.addAddon(...arg)
        this.props.setModalVisibility(true,addaddonmodal,{addNewAddon})
    }

    getAddons = () =>{
        this.props.showLoadingSpinner(true);
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.get(
            `${process.env.REACT_APP_URL}/api/v1/addon/`,
            {headers},
        ).then((response) => {
            const { addons } = response.data;
            console.log(addons)
            this.props.setAvailableAddons(addons);
            // reset the error message  
            let errorMessage = {message: "", show: false};
            this.props.setErrorMessage(errorMessage);
            this.props.showLoadingSpinner(false)
        }).catch((error) => {
            console.log(error)
            this.props.showLoadingSpinner(false)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
    }

    addAddon = (addonfields) =>{
        const{ category, name, description,image,cost} = addonfields;
        let data = {
            category,
            name,
            description,
            image,
            cost
        };

        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.post(
            `${process.env.REACT_APP_URL}/api/v1/addon/`,
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

    removeAddon = (event) =>{
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.delete(
            `${process.env.REACT_APP_URL}/api/v1/addon/${event.target.id}`,
            {headers},
            options
        ).then((response) => {
            const { addon } = response.data;
            const {image } = addon;
            //Delete the image from image
            storageService.refFromURL(image)
                .delete()
                .then(function() {
                    // File deleted successfully
                    console.log('Sucessfully deleted image')
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                    console.log('an error occured' + error);
                });

            // reset the error message  
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

    editAddon = (_id, data) =>{      
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.put(
            `${process.env.REACT_APP_URL}/api/v1/addon/${_id}`,
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

    getCategories = ()=>{
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.get(
            `${process.env.REACT_APP_URL}/api/v1/category/`,
            {headers},
        ).then((response) => {
            const { categories } = response.data;
            this.props.setCategories(categories);
            // reset the error message  
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

    render() {
        const { addons, spinner } = this.props;
        
        return (
            <div className="addons">
                { 
                    spinner ?
                    <SpringSpinner color='#000000' size={parseInt('20')}/> :
                    addons.map((addon) => <Tiles addon={addon} key={addon._id} removeAddon={this.removeAddon} editAddon={this.editAddon}/>)
                }
                <div className="addAddon" onClick={this.showAddModal}>+</div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, addons, categories, spinner} = state;
    return { errorMessage, addons,categories, spinner };
}

const mapDispatchToProps = {
    setErrorMessage,
    setAvailableAddons,
    addNewAddon,
    removeAddon,
    updateAddon,
    setCategories,
    setModalVisibility,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(Addons);