import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

//Import created components
import { secureStorage, pusher, firebase } from '../../../../../../utils';
import { 
    setErrorMessage, 
    setAvailableSnacks, 
    addNewSnack, 
    removeSnack, 
    updateSnack ,
    setCategories, 
    setModalVisibility, 
    showLoadingSpinner
} from '../../../../../../actions';
import Tiles from './Tiles/Tiles';
import { addsnackmodal   } from '../../../../../../constants/modals';

//import the css file
import './Snacks.css';

//Declare all file constants
const storageService = firebase.storage();

export class Snacks extends Component {

    constructor(props){
        super(props)
        this.getSnacks();
        this.getCategories();
    }

    componentDidMount(){
        this.channel = pusher.subscribe('snacks');
        this.channel.bind('inserted', this.insertSnack);
        this.channel.bind('deleted', this.deleteSnack);
        this.channel.bind('updated', this.updateSnack);
    }

    insertSnack = (snack) =>{
        this.props.addNewSnack(snack.snack);
    }

    deleteSnack = (snack) =>{
        this.props.removeSnack(snack);
    }

    updateSnack = (snack) =>{
        this.props.updateSnack(snack.snack);
    }

    showAddModal = () =>{
        let addNewSnack = (...arg) =>this.addSnack(...arg)
        this.props.setModalVisibility(true,addsnackmodal,{addNewSnack})
    }

    getSnacks = () =>{
        this.props.showLoadingSpinner(true);
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.get(
            `${process.env.REACT_APP_URL}/api/v1/snack/`,
            {headers},
        ).then((response) => {
            const { snacks } = response.data;
            console.log(snacks)
            this.props.setAvailableSnacks(snacks);
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

    addSnack = (snackfields) =>{
        const{ category, name, description,image,weight,shape,tiers,flavour,cost} = snackfields;
        let data = {
            category,
            name,
            description,
            image,
            snackDetails:{
                weight,
                shape,
                tiers,
                flavour,
                cost
            }
        };

        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.post(
            `${process.env.REACT_APP_URL}/api/v1/snack/`,
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

    removeSnack = (event) =>{
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.delete(
            `${process.env.REACT_APP_URL}/api/v1/snack/${event.target.id}`,
            {headers},
            options
        ).then((response) => {
            const { snack } = response.data;
            const {image } = snack;
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

    editSnack = (_id, data) =>{      
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.put(
            `${process.env.REACT_APP_URL}/api/v1/snack/${_id}`,
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
        const { snacks, spinner } = this.props;
        
        return (
            <div className="snacks">
                { 
                    spinner ?
                    <SpringSpinner color='#000000' size={parseInt('20')}/> :
                    snacks.map((snack) => <Tiles snack={snack} key={snack._id} removeSnack={this.removeSnack} editSnack={this.editSnack}/>)
                }
                <div className="addSnack" onClick={this.showAddModal}>+</div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, snacks, categories, spinner} = state;
    return { errorMessage, snacks,categories, spinner };
}

const mapDispatchToProps = {
    setErrorMessage,
    setAvailableSnacks,
    addNewSnack,
    removeSnack,
    updateSnack,
    setCategories,
    setModalVisibility,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(Snacks);