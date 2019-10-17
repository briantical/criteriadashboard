import React from 'react';
import './Editcakemodal.css';

const cake = require('../../../../../assets/cake.png');
const Editcakemodal = (props) => {

    let updateCake = ()=>{
        props.editCake();
    }

    return (
        <div>
            <p>EDIT MODAL</p>
        </div>
    )
}

export default Editcakemodal;