import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Sidebarcontent.css';

export class Sidebarcontent extends Component {
    render() {
        return (
            <section className='sidebarcontent'>
                SIDE BAR CONTENT
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user }; 
};

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebarcontent))