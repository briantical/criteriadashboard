import React from "react";

import "./Profilemodal.css";
import axios from "axios";
import { secureStorage } from "../../../../../utils";
import { withRouter } from "react-router-dom";

const Profilemodal = props => {
  const {
    modalprops: {
      user: {
        profile: { userName }
      }
    }
  } = props;
  let signout = () => {
    let headers = {
      Authorization: "Bearer " + secureStorage.getItem("token").token
    };
    axios
      .post(`${process.env.REACT_APP_URL}/api/v1/auth/sign-out`, null, {
        headers
      })
      .then(response => {
        secureStorage.clear();
      })
      .then(() => {
        props.history.push("/login");
      })
      .catch(error => {
        let theError = { message: error, show: true };
        console.log(theError);
      });
  };

  let handleOnClick = event => {
    event.stopPropagation();
  };

  return (
    <div className="profilemodal" onClick={() => props.hideModal()}>
      <div className="profilemodalpop" onClick={e => handleOnClick(e)}>
        <div>{userName.toUpperCase()}</div>
        <div onClick={() => signout()}>SIGN OUT</div>
      </div>
    </div>
  );
};

export default withRouter(Profilemodal);
