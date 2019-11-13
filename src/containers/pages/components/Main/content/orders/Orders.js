import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SpringSpinner from "@bit/bondz.react-epic-spinners.spring-spinner";

import { secureStorage } from "../../../../../../utils";

import {
  showLoadingSpinner,
  setAvailableOrders,
  setErrorMessage,
  removeOrder,
  updateOrder
} from "../../../../../../actions";

import "./Orders.css";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.getOrders();
  }

  getOrders = () => {
    this.props.showLoadingSpinner(true);
    let headers = {
      Authorization: "Bearer " + secureStorage.getItem("token").token
    };

    axios
      .get(`${process.env.REACT_APP_URL}/api/v1/order/`, { headers })
      .then(response => {
        const { orders } = response.data;
        this.props.setAvailableOrders(orders);
        // reset the error message
        let errorMessage = { message: "", show: false };
        this.props.setErrorMessage(errorMessage);
        this.props.showLoadingSpinner(false);
      })
      .catch(error => {
        console.log(error);
        let message = error;
        let show = true;
        let theError = { message, show };
        this.props.setErrorMessage(theError);
      });
  };

  render() {
    let { spinner } = this.props;

    return (
      <div className="orders">
        {spinner ? (
          <SpringSpinner color="#000000" size={parseInt("20")} />
        ) : (
          "THIS IS THE ORDERS PAGE"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage, spinner } = state;
  return { errorMessage, spinner };
};

const mapDispatchToProps = {
  showLoadingSpinner,
  setAvailableOrders,
  setErrorMessage,
  removeOrder,
  updateOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
