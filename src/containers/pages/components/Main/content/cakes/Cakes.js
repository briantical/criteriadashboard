import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { secureStorage, pusher } from '../../../../../../utils';
import { setErrorMessage, setAvailableCakes, addNewCake, removeCake, updateCake} from '../../../../../../actions';
import Tiles from './Tiles/Tiles';

import './Cakes.css';

export class Cakes extends Component {
    componentDidMount(){
        this.channel = pusher.subscribe('cakes');
        this.channel.bind('inserted', this.insertCake);
        this.channel.bind('deleted', this.deleteCake);
        this.channel.bind('updated', this.updateCake);
        this.getCakes();
    }

    insertCake = (cake) =>{
        this.props.addNewCake(cake.cake);
    }

    deleteCake = (cake) =>{
        this.props.removeCake(cake);
    }

    updateCake = (cake) =>{
        this.props.updateCake(cake);
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
            let message = error.response.data.message;
            let show = true;
            let theError = {message,show}
            this.props.setErrorMessage(theError);
        });
    }

    addCake = (...cakefields) =>{
        const[ category, name, description,image,weight,shape,tiers,flavour,cost] = cakefields;
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

    render() {
        const { cakes } = this.props;
        return (
            <div className="cakes">
                { cakes.map((cake) => <Tiles cake={cake} key={cake._id} removeCake={this.removeCake} editCake={this.editCake}/>)}
                <div className="addCake" onClick={this.addCake}>+</div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    const {errorMessage, cakes } = state;
    return { errorMessage, cakes };
}

const mapDispatchToProps = {
    setErrorMessage,
    setAvailableCakes,
    addNewCake,
    removeCake,
    updateCake
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakes);