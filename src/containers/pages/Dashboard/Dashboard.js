import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Dashboard.css';

import { setModalVisibility ,setActiveUser,setUserEmail } from '../../../actions';
import { Sidebar , Main , Profilemodal, Editcakemodal, Addcakemodal, Addsnackmodal, Editsnackmodal} from '../components';
import { 
    profilemodal, 
    editcakemodal, 
    addcakemodal,
    addsnackmodal,
    editsnackmodal
} from '../../../constants/modals';
import { secureStorage } from '../../../utils'


export class Dashboard extends Component {

    componentDidMount = ()=>{
        let { user, setActiveUser } = this.props;
        user = user == null ? secureStorage.getItem('user').user : user;
        setActiveUser(user);
        setUserEmail(secureStorage.getItem('email').email);
    }

    closeModal =(modal)=>{
        this.props.setModalVisibility(false,modal,null);
    }
    
    chooseModal = (modal, modalprops) =>{
        switch (modal) {
            case profilemodal:
                return <Profilemodal hideModal={()=>this.closeModal(profilemodal)} modalprops={modalprops}/>

            case editcakemodal:
                return <Editcakemodal hideModal={()=>this.closeModal(editcakemodal)} modalprops={modalprops}/>

            case addcakemodal:
                return <Addcakemodal hideModal={()=>this.closeModal(editcakemodal)} modalprops={modalprops}/>

            case editsnackmodal:
                    return <Editsnackmodal hideModal={()=>this.closeModal(editcakemodal)} modalprops={modalprops}/>
    
            case addsnackmodal:
                return <Addsnackmodal hideModal={()=>this.closeModal(editcakemodal)} modalprops={modalprops}/>
        
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
                { show ? this.chooseModal(modal, modalprops) : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user, showModal } = state;
    return { user , showModal};  
};

const mapDispatchToProps = {
    setModalVisibility,
    setActiveUser,
    setUserEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));