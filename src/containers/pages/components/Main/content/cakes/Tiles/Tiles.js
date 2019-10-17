import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility} from '../../../../../../../actions/';
import { Editcakemodal } from '../../../../Modals/'

import './Tiles.css';

export class Tiles extends Component {
    handleOnClick = () =>{
        this.props.editCake();
        this.setModalVisibility(true);
        return <Editcakemodal/>
    }

    render() {
        const {cake , removeCake, editCake, showModal} = this.props;
        const { cakeDetails, name, category, description, image, _id } = cake;
        console.log(this.props)
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

const mapStateToProps = (state) => {
    const { showModal } = state;
    return { showModal}
}

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(Tiles)