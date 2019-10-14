import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Tiles.css';

export class Tiles extends Component {
    render() {
        const {cake } = this.props;
        const { cakeDetails, name, category, description, image } = cake;
        return (
            <div className="tiles">
               <p>{name}</p>
               <p>{category}</p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{JSON.stringify(cakeDetails)}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles)
