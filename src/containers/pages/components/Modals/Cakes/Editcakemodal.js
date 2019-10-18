import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Editcakemodal.css';

export class Editcakemodal extends Component {
    render() {
        const {showModal:{modalprops}} =this.props;
        return (
            <div className="editcakemodal">
                <div>{JSON.stringify(modalprops)}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { showModal } = state;
    return { showModal }
};

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Editcakemodal)
