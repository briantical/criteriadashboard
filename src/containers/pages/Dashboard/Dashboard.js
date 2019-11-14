import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Dashboard.css";

import {
  setModalVisibility,
  setActiveUser,
  setUserEmail
} from "../../../actions";

import {
  Sidebar,
  Main,
  Profilemodal,
  Editcakemodal,
  Addcakemodal,
  Addsnackmodal,
  Editsnackmodal,
  Addaddonmodal,
  Editaddonmodal
} from "../components";
import {
  profilemodal,
  editcakemodal,
  addcakemodal,
  addsnackmodal,
  editsnackmodal,
  addaddonmodal,
  editaddonmodal
} from "../../../constants/modals";
import { secureStorage } from "../../../utils";

export class Dashboard extends Component {
  componentDidMount = () => {
    let token = secureStorage.getItem("token");
    console.log("The token 1:" + token);
    let { user, setActiveUser, history } = this.props;

    user =
      secureStorage.getItem("user") !== null
        ? secureStorage.getItem("user").user
        : user;
    console.log(user);

    let setupuser = () => {
      setActiveUser(user);
      setUserEmail(secureStorage.getItem("email").email);
    };

    if (user !== null) {
      const {
        profile: { complete }
      } = user;
      complete ? setupuser() : history.push("/login");
    } else {
      history.push("/login");
    }
  };

  closeModal = modal => {
    this.props.setModalVisibility(false, modal, null);
  };

  chooseModal = (modal, modalprops) => {
    switch (modal) {
      case profilemodal:
        return (
          <Profilemodal
            hideModal={() => this.closeModal(profilemodal)}
            modalprops={modalprops}
          />
        );

      case editcakemodal:
        return (
          <Editcakemodal
            hideModal={() => this.closeModal(editcakemodal)}
            modalprops={modalprops}
          />
        );

      case addcakemodal:
        return (
          <Addcakemodal
            hideModal={() => this.closeModal(editcakemodal)}
            modalprops={modalprops}
          />
        );

      case editsnackmodal:
        return (
          <Editsnackmodal
            hideModal={() => this.closeModal(editsnackmodal)}
            modalprops={modalprops}
          />
        );

      case addsnackmodal:
        return (
          <Addsnackmodal
            hideModal={() => this.closeModal(editsnackmodal)}
            modalprops={modalprops}
          />
        );

      case editaddonmodal:
        return (
          <Editaddonmodal
            hideModal={() => this.closeModal(editaddonmodal)}
            modalprops={modalprops}
          />
        );

      case addaddonmodal:
        return (
          <Addaddonmodal
            hideModal={() => this.closeModal(editaddonmodal)}
            modalprops={modalprops}
          />
        );

      default:
        break;
    }
  };

  render = () => {
    let token = secureStorage.getItem("token");
    console.log("The token 2:" + token);
    const {
      showModal: { show, modal, modalprops },
      history
    } = this.props;
    if (token !== null) {
      return (
        <div className="dashboard">
          <Sidebar />
          <Main />
          {show ? this.chooseModal(modal, modalprops) : null}
        </div>
      );
    } else {
      history.push("/login");
      return null;
    }
  };
}

const mapStateToProps = state => {
  const { user, showModal } = state;
  return { user, showModal };
};

const mapDispatchToProps = {
  setModalVisibility,
  setActiveUser,
  setUserEmail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
