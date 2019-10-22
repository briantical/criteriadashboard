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
        const {cake , removeCake, categories } = this.props;
        let { cakeDetails, name, category, description, image, _id } = cake;
        
        return (
            <div className="tiles">
                <div id={_id} className="removeCake" onClick={removeCake}>-</div>
               <p>{name}</p>
               <p>{
                    typeof(category) !== 'object' ? categories.find((newcategory)=> newcategory._id === category).name : category.name
                   }
                </p>
               <p>{description}</p>
               <p>{image}</p>
               <p>{JSON.stringify(cakeDetails)}</p>
               <div className="editCake" onClick={this.handleOnClick}>/</div>
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