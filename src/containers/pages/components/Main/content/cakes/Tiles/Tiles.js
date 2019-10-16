import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Tiles.css';

export class Tiles extends Component {
    render() {
        const {cake , removeCake, editCake} = this.props;
        const { cakeDetails, name, category, description, image, _id } = cake;
        return (
            <div className="tiles">
                <div id={_id} className="removeCake" onClick={removeCake}>-</div>
               <p>{name}</p>
               <p>{category}</p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{JSON.stringify(cakeDetails)}</p>
               <div className="editCake" onClick={editCake}>/</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles)
