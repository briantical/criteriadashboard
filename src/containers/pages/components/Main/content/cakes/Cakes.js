import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { secureStorage, pusher, firebase } from '../../../../../../utils';
import { setErrorMessage, setAvailableCakes, addNewCake, removeCake, updateCake ,setCakeCategories, setModalVisibility} from '../../../../../../actions';
import Tiles from './Tiles/Tiles';

import {addcakemodal} from '../../../../../../constants/modals'

import './Cakes.css';

const storageService = firebase.storage();

export class Cakes extends Component {

    UNSAFE_componentWillMount(){
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

    showAddModal =()=>{
        let addNewCake = (...arg) =>this.addCake(...arg)
        this.props.setModalVisibility(true,addcakemodal,{addNewCake})
    }

    getCakes = () =>{
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
        }).catch((error) => {
            console.log(error)
            // let message = error.response.data.message;
            // let show = true;
            // let theError = {message,show}
            // this.props.setErrorMessage(theError);
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
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
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
        }).catch((error) => {
            console.log(error)
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
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
            this.props.setCakeCategories(categories);
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
        const { cakes } = this.props;
        
        return (
            <div className="cakes">
                { cakes.map((cake) => <Tiles cake={cake} key={cake._id} removeCake={this.removeCake} editCake={this.editCake}/>)}
                <div className="addCake" onClick={this.showAddModal}>+</div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, cakes, categories} = state;
    return { errorMessage, cakes,categories };
}

const mapDispatchToProps = {
    setErrorMessage,
    setAvailableCakes,
    addNewCake,
    removeCake,
    updateCake,
    setCakeCategories,
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakes);