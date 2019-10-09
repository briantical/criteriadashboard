import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Sidebarnav.css';

export class Siderbarnav extends Component {
    render() {
        return (
            <section className='sidebarnav'>
                SIDEBAR NAV
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Siderbarnav));