import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter , Link } from 'react-router-dom';

import { setActiveUser ,setErrorMessage }  from '../../../actions';

export class Profile extends Component {
    componentDidMount(){
        console.log(this.props.user)
    }

    render() {
        const { user } = this.props;
        const { email} = user || '';
        return (
            <div>
                <p>COMPLETE PROFILE PAGE</p>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td><img src={require ("../../../assets/MOI.jpg")} className="rounded-circle rounded-sm" style={{height:50,width:50}} alt="profilepic"/></td>
                                <td>NAME:</td>
                                <td><input name="fullname" id="fullname" autoComplete="off"/> </td>
                            </tr>
                            <tr>
                                <td>ADDRESS</td>
                                <td><input name="address" id="address" autoComplete="off"/></td>
                            </tr>
                            <tr>
                                <td>EMAIL</td>
                                <td><input name="email" id="email" autoComplete="off" value={email} readOnly/></td>
                            </tr>
                            <tr>
                                <td>PHONE NUMBER</td>
                                <td><input name="phone" id="spank" autoComplete="off"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <button>COMPLETE</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user }
};

const mapDispatchToProps = {
    setActiveUser,
    setErrorMessage 
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
