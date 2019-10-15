import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { secureStorage, pusher } from '../../../../../../utils';
import { setErrorMessage, setAvailableCakes, addNewCake } from '../../../../../../actions';
import Tiles from './Tiles/Tiles';

import './Cakes.css';

export class Cakes extends Component {
    componentDidMount(){
        this.channel = pusher.subscribe('cakes');
        this.channel.bind('inserted', this.insertCake);
        this.getCakes();
    }

    insertCake = (cake) =>{
        this.props.addNewCake(cake.cake);
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

    addCake = () =>{
        // let data = {
        //     fullName,
        //     avatar,
        //     phoneNumber,
        //     userName,
        //     coordinates
        // };

       let data = { 
            "category": "5d591e994c72e00249d8076a",
            "name" : "parte parter 21123",
            "description":"every moment matters",
            "image":"https://firebasestorage.googleapis.com/v0/b/criteria-66b60.appspot.com/o/images%2Fcake.jpg?alt=media&token=48429a2a-901e-4bfa-b52d-40c420a7dd19",
            "cakeDetails":
            {
                "weight": 1,
                "shape": "Square",
                "tiers": 4,
                "flavour":"Zucchini",
                "cost": 49000
            }
        }
        
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
        ).then((response) => {
            console.log(response)
            //const { cake } = response.data;
            //const { cakes } = response.data;
            // this.props.setAvailableCakes(cakes);
            // // reset the error message  
            // let errorMessage = {message: "", show: false};
            // this.props.setErrorMessage(errorMessage);
        }).catch((error) => {
            console.log(error)
            // let message = error.response.data.message;
            // let show = true;
            // let theError = {message,show}
            // this.props.setErrorMessage(theError);
        });
    }

    render() {
        const { cakes } = this.props;
        return (
            <div>
                <div className="cakes">
                    { cakes.map((cake) => <Tiles cake={cake} key={cake._id}/>)}
                </div>
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
    addNewCake
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakes);