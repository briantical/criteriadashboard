import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Main.css';
import {Cakes, Snacks, Orders, Wallet, Staff} from './content/'
import { Editcakemodal } from '../Modals';

export class Main extends Component {

    loadPage = (page)=>{
        switch (page) {
            case 'cakes':
                return <Cakes/>;

            case 'snacks':
                return <Snacks/>;
            
            case 'orders':
                return <Orders/>;
            
            case 'wallet':
                return <Wallet/>;
            
            case 'staff':
                return <Staff/>;
        
            default:
                return <Cakes/>;
        }
    }

    render() {
        const { showPage, showModal } =this.props;
        return (
            <main className='main'>
                {
                    showPage.show ? this.loadPage(showPage.page) : <Cakes/>
                }
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    const { user , showPage, showModal} = state;
    return { user, showPage, showModal};  
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);