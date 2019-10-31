import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility} from '../../../../../../../actions';

import './Listings.css';

export class Listings extends Component {
    
    handleOnClick = () =>{
        let modalprops = this.props;
        this.props.setModalVisibility(true,'editcategorymodal', modalprops);
    }

    render() {
        const {category , removeCategory } = this.props;
        let { name, description, _id } = category;
        
        return (
            <div className="listings">
                <div id={_id} className="removeCategory" onClick={removeCategory}>-</div>
               <p>{name}</p>
               <p>{description}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Listings);