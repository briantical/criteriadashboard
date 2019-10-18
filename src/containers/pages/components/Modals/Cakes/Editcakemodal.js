import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Editcakemodal.css';

export class Editcakemodal extends Component {
    render() {
        const {hideModal,modalprops:{cake:{name,description,category,image,cakeDetails:{shape,tiers,weight,flavour,cost}}}} =this.props;
        return (
            <div className="editcakemodal" onClick={hideModal}>
                <div className="editmodaltable">
                    <table>
                        <tbody>
                            <tr>
                                <td>NAME:</td>
                                <td><input type="text" placeholder={name}/></td>
                            </tr>
                            <tr>
                                <td>CATEGORY:</td>
                                <td><input type="text" placeholder={category}/></td>
                            </tr>
                            <tr>
                                <td>DESCRIPTION:</td>
                                <td><input type="text" placeholder={description}/></td>
                            </tr>
                            <tr>
                                <td>COST:</td>
                                <td><input type="number" placeholder={cost}/></td>
                            </tr>
                            <tr>
                                <td>WEIGHT:</td>
                                <td><input type="number" placeholder={weight}/></td>
                            </tr>
                            <tr>
                                <td>SHAPE:</td>
                                <td><input type="text" placeholder={shape}/></td>
                            </tr>
                            <tr>
                                <td>TIERS:</td>
                                <td><input type="number" placeholder={tiers}/></td>
                            </tr>
                            <tr>
                                <td>FLAVOUR:</td>
                                <td><input type="text" placeholder={flavour}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
