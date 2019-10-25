import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';

//Import created components
import { secureStorage, pusher, firebase } from '../../../../../../utils';
import { 
    setErrorMessage, 
    setAvailableCakes, 
    addNewCake, 
    removeCake, 
    updateCake ,
    setCategories, 
    setModalVisibility, 
    showLoadingSpinner
} from '../../../../../../actions';
import Tiles from './Tiles/Tiles';
import { addcakemodal } from '../../../../../../constants/modals';

//import the css file
import './Cakes.css';

//Declare all file constants
const storageService = firebase.storage();

export class Cakes extends Component {

    constructor(props){
        super(props)
        this.getCakes();
        this.getCategories();
    }

    componentDidMount(){
        this.channel = pusher.subscribe('cakes');
        this.channel.bind('inserted', this.insertCake);
        this.channel.bind('deleted', this.deleteCake);
        this.channel.bind('updated', this.updateCake);
    }

    insertCake = (cake) =>{
        this.props.addNewCake(cake.cake);
    }

    deleteCake = (cake) =>{
        this.props.removeCake(cake);
    }

    updateCake = (cake) =>{
        this.props.updateCake(cake.cake);
    }

    showAddModal = () =>{
        let addNewCake = (...arg) =>this.addCake(...arg)
        this.props.setModalVisibility(true,addcakemodal,{addNewCake})
    }

    getCakes = () =>{
        this.props.showLoadingSpinner(true);
        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.get(
            'http://localhost:3000/api/v1/cake/',
            {headers},
        ).then((response) => {
            const { cakes } = response.data;
            this.props.setAvailableCakes(cakes);
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

    addCake = (cakefields) =>{
        const{ category, name, description,image,weight,shape,tiers,flavour,cost} = cakefields;
        let data = {
            category,
            name,
            description,
            image,
            cakeDetails:{
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
            'http://localhost:3000/api/v1/cake/',
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

    removeCake = (event) =>{
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.delete(
            `http://localhost:3000/api/v1/cake/${event.target.id}`,
            {headers},
            options
        ).then((response) => {
            const { cake } = response.data;
            const {image } = cake;
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

    editCake = (_id, data) =>{      
        let options = {
            responseType: "json",
        }

        let headers = {
            'Authorization': 'Bearer ' + secureStorage.getItem('token').token
        }

        axios.put(
            `http://localhost:3000/api/v1/cake/${_id}`,
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
            'http://localhost:3000/api/v1/category/',
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
        const { cakes, spinner } = this.props;
        
        return (
            <div className="cakes">
                { 
                    spinner ?
                    <SpringSpinner color='#000000' size={parseInt('20')}/> :
                    cakes.map((cake) => <Tiles cake={cake} key={cake._id} removeCake={this.removeCake} editCake={this.editCake}/>)
                }
                <div className="addCake" onClick={this.showAddModal}>+</div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, cakes, categories, spinner} = state;
    return { errorMessage, cakes,categories, spinner };
}

const mapDispatchToProps = {
    setErrorMessage,
    setAvailableCakes,
    addNewCake,
    removeCake,
    updateCake,
    setCategories,
    setModalVisibility,
    showLoadingSpinner
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakes);