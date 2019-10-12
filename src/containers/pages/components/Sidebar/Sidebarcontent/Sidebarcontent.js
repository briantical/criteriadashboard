import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Sidebarcontent.css';
import { setPageVisibility } from '../../../../../actions';

export class Sidebarcontent extends Component {

    showPage = (page,show) =>{
        this.props.setPageVisibility(page,show);
    }

    handleOnClick = (event) =>{
        event.stopPropagation();

        switch (event.target.id) {
            //Display the cakes page
            case 'cakes':
                this.showPage('cakes',true);
                break;

            //Display the snacks page
            case 'snacks':
                this.showPage('snacks',true);
                break;
            
            //Display the orders page
            case 'orders':
                this.showPage('orders',true);
                break;
            
            //Display the mobile money wallet transactions
            case 'wallet':
                this.showPage('wallet',true);
                break;

            //Display the staff
            case 'staff':
                this.showPage('staff',true);
                break;
            
            //Redirect to Dashboard if all fails
            default:
                this.props.history.push('/dashboard');
                break;
        }
    }

    render() {
        return (
            <section className='sidebarcontent'>
                <div>CRITERIA CAKES</div>
                <div onClick={this.handleOnClick} id='cakes'>CAKES</div>
                <div onClick={this.handleOnClick} id='snacks'>SNACKS</div>
                <div onClick={this.handleOnClick} id='orders'>ORDERS</div>
                <div onClick={this.handleOnClick} id='wallet'>WALLET</div>
                <div onClick={this.handleOnClick} id='staff'>STAFF</div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user }; 
};

const mapDispatchToProps = {
    setPageVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebarcontent));