import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility} from '../../../../../../../actions/';

import './Tiles.css';

export class Tiles extends Component {
    
    handleOnClick = () =>{
        let modalprops = this.props;
        this.props.setModalVisibility(true,'editcakemodal', modalprops);
    }

    render() {
        const {cake , removeCake } = this.props;
        const { cakeDetails, name, category, description, image, _id } = cake;
        
        return (
            <div className="tiles">
                <div id={_id} className="removeCake" onClick={removeCake}>-</div>
               <p>{name}</p>
               <p>{category.name}</p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{JSON.stringify(cakeDetails)}</p>
               <div className="editCake" onClick={this.handleOnClick}>/</div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    const { showModal } = state;
    return { showModal}
}

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles)