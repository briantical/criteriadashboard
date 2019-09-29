import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Dashboard.css';

import { Sidebar , Main } from '../components'

export class Dashboard extends Component {
    render() {
        console.log('Dashboard user' + JSON.stringify(this.props.user))
        return (
            <div className='dashboard'>
                <Sidebar/>
                <Main/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };  
};

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
