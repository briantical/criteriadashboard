import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Cakes extends Component {
    render() {
        return (
            <div>
                THIS IS THE CAKES PAGE
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cakes);