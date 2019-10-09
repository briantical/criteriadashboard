import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Main.css';

export class Main extends Component {
    render() {
        return (
            <main className='main'>
                THIS IS THE MAIN PAGE CONTENT
                <p>{JSON.stringify(this.props.user)}</p>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };  
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);