import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Sidebarnav.css';
import {setModalVisibility} from '../../../../../actions';

const avatar = require('../../../../../assets/avatar.png');

export class Siderbarnav extends Component {

    openModal = () =>{
        console.log('qwerty');
        this.props.setModalVisibility(true);
    }

    closeModal = () =>{
        this.props.setModalVisibility(false);
    }

    handleOnClick = (event) =>{
        event.preventDefault();
        
        switch (event.target.id) {
            //Redirect the dashboard
            case 'home':
                this.props.history.push('/');
                break;

            //Show the search modal
            case 'search':

                break;

            //Show the support page
            case 'help':

                break;

            //Show the user profile
            case 'profile':
                
                this.openModal();
                break;
            
            //Redirect to Dashboard if all fails
            default:
                this.props.history.push('/');
                break;
        }
    }

    render() {
        
        return (
            <section className='sidebarnav'>
                <div onClick={this.handleOnClick} id='home'>HOME</div>
                <div onClick={this.handleOnClick} id='search'>SEARCH</div>
                <div onClick={this.handleOnClick} id='help'>HELP</div>
                <div onClick={this.handleOnClick} id='profile'>
                    <img src={avatar} alt='avatar'/>
                </div>
            </section>
        )
    }
};

const mapStateToProps = (state) => {
    const { user , showModal } = state;
    return { user , showModal };
}

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Siderbarnav));