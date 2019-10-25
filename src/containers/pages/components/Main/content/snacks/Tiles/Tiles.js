import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility} from '../../../../../../../actions/';

import './Tiles.css';

export class Tiles extends Component {
    
    handleOnClick = () =>{
        let modalprops = this.props;
        this.props.setModalVisibility(true,'editsnackmodal', modalprops);
    }

    render() {
        const {snack , removeSnack, categories } = this.props;
        let { snackDetails, name, category, description, image, _id } = snack;
        
        return (
            <div className="tiles">
                <div id={_id} className="removeSnack" onClick={removeSnack}>-</div>
               <p>{name}</p>
               <p>{
                    typeof(category) !== 'object' ? categories.find((newcategory)=> newcategory._id === category).name : category.name
                   }
                </p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{JSON.stringify(snackDetails)}</p>
               <div className="editSnack" onClick={this.handleOnClick}>/</div>
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