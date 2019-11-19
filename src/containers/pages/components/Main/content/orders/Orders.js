import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import SpringSpinner from "@bit/bondz.react-epic-spinners.spring-spinner";

import { secureStorage } from "../../../../../../utils";

import {
  setAvailableCartItems,
  showLoadingSpinner,
  setAvailableOrders,
  setErrorMessage,
  removeOrder,
  updateCart,
  updateOrder
} from "../../../../../../actions";

import "./Orders.css";

export class Orders extends Component {
  constructor(props) {
    super(props);
    this.getOrders();
    this.getCart();
  }

  getCart = () => {
    this.props.showLoadingSpinner(true);
    let headers = {
      Authorization: "Bearer " + secureStorage.getItem("token").token
    };

    let {
      user: {
        cart: { _id: cartID }
      }
    } = this.props;

    axios
      .get(`${process.env.REACT_APP_URL}/api/v1/cart/${cartID}`, { headers })
      .then(response => {
        const { cart } = response.data;
        this.props.setAvailableCartItems(cart);
        console.log(cart);
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

  handleSubmit = event => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      let message = "";
      let show = true;
      this.props.setErrorMessage({ message, show });
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    this.props.showLoadingSpinner(true);

    let {
      user: {
        _id: customer,
        cart: { _id: cart }
      }
    } = this.props;

    let comments = data.get("comments");
    let orderDate = Date();
    let orderStatus = "Not yet Accepted";
    let customer = this.addCategory({
      customer,
      cart,
      comments,
      orderDate,
      orderStatus
    });
  };

  render() {
    let {
      spinner,
      errorMessage,
      carts: { items }
    } = this.props;

    return (
      <div className="orders">
        <div className="makeorder">
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={errorMessage.show ? "displayErrors" : ""}
          >
            <table>
              <tbody>
                <tr>
                  <td>ITEMS:</td>
                  <td>
                    <input
                      type="text"
                      id="items"
                      name="items"
                      autoComplete="off"
                      required
                      readOnly
                      placeholder={items}
                    />
                  </td>
                </tr>
                <tr>
                  <td>COMMENTS:</td>
                  <td>
                    <input
                      type="text"
                      id="comments"
                      name="comments"
                      autoComplete="off"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {spinner ? (
              <SpringSpinner color="#000000" size={parseInt("20")} />
            ) : (
              <button>ORDER</button>
            )}
          </form>
        </div>

        <div className="orders_list">
          {spinner ? (
            <SpringSpinner color="#000000" size={parseInt("20")} />
          ) : (
            "THIS IS THE ORDERS PAGE"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage, spinner, user, carts } = state;
  return { errorMessage, spinner, user, carts };
};

const mapDispatchToProps = {
  setAvailableCartItems,
  showLoadingSpinner,
  setAvailableOrders,
  setErrorMessage,
  removeOrder,
  updateCart,
  updateOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
