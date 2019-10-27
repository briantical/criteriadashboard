import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility} from '../../../../../../../actions/';

import './Tiles.css';

export class Tiles extends Component {
    
    handleOnClick = () =>{
        let modalprops = this.props;
        this.props.setModalVisibility(true,'editaddonmodal', modalprops);
    }

    render() {
        const {addon , removeAddon, categories } = this.props;
        let { cost, name, category, description, image, _id } = addon;
        
        return (
            <div className="tiles">
                <div id={_id} className="removeAddon" onClick={removeAddon}>-</div>
               <p>{name}</p>
               <p>{
                    typeof(category) !== 'object' ? categories.find((newcategory)=> newcategory._id === category).name : category.name
                   }
                </p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{cost}</p>
               <div className="editAddon" onClick={this.handleOnClick}>/</div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    const { showModal, categories } = state;
    return { showModal, categories}
}

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles);