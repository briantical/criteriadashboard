import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Dashboard.css';

import { setModalVisibility } from '../../../actions';
import { Sidebar , Main , Profilemodal} from '../components';

export class Dashboard extends Component {

    closeModal =()=>{
        this.props.setModalVisibility(false);
    }
    chooseModal = (modal) =>{
        switch (modal) {
            case 'profilemodal':
                return <Profilemodal hideModal={()=>this.closeModal()}/>
        
            default:
                break;
        }
    }

    render() {
        const { showModal:{show, modal,modalprops} } = this.props;
        return (
            <div className='dashboard'>
                <Sidebar/>
                <Main/>
                { show ? this.chooseModal(modal) : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, showModal } = state;
    return { user , showModal};  
};

const mapDispatchToProps = {
    setModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));