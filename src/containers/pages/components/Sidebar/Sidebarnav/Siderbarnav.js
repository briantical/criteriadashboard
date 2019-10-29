import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Sidebarnav.css';
import {setModalVisibility} from '../../../../../actions';

let avatar = require('../../../../../assets/avatar.png');

export class Siderbarnav extends Component {

    openModal = (modal) =>{
        const { user } = this.props;
        this.props.setModalVisibility(true, modal, {user});
    }

    closeModal = () =>{
        this.props.setModalVisibility(false);
    }

    handleOnClick = (event) =>{
        event.preventDefault();
        
        switch (event.target.id) {
            //Redirect the dashboard
            case 'home':
                this.props.history.push('/dashboard');
                break;

            //Show the search modal
            case 'search':

                break;

            //Show the support modal
            case 'help':

                break;

            //Show the user profile
            case 'profilemodal':
                
                this.openModal(event.target.id);
                break;
            
            //Redirect to Dashboard if all fails
            default:
                this.props.history.push('/dashboard');
                break;
        }
    }

    render() {
        const { user } = this.props;
    
        avatar = (user != null && user.profile != null) ?  user.profile.avatar : avatar

        return (
            <section className='sidebarnav'>
                <div onClick={this.handleOnClick} id='home'>HOME</div>
                <div onClick={this.handleOnClick} id='search'>SEARCH</div>
                <div onClick={this.handleOnClick} id='help'>HELP</div>
                <div onClick={this.handleOnClick} id='profilemodal' style={{backgroundImage:`url(${avatar})`}}/>
            </section>
        )
    }
};

const mapStateToProps = (state) => {
    const { user } = state;
    return { user};
}

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Siderbarnav));