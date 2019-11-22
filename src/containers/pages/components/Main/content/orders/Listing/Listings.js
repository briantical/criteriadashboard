import React, { Component } from "react";
import { connect } from "react-redux";

import { setModalVisibility } from "../../../../../../../actions";

import "./Listings.css";

export class Listings extends Component {
  handleOnClick = () => {
    let modalprops = this.props;
    this.props.setModalVisibility(true, "editordermodal", modalprops);
  };

  render() {
    const { order, removeOrder } = this.props;

    let {
      _id,
      orderStatus,
      orderDate,
      comments,
      cart: { payment, items },
      customer: {
        profile: { fullName, phoneNumber }
      }
    } = order;

    return (
      <div className="listings">
        <div id={_id} className="removeOrder" onClick={removeOrder}>
          -
        </div>
        <p>Client:{fullName}</p>
        <p>Contact:{phoneNumber}</p>
        <p>Comments:{comments}</p>
        <p>Order Status:{orderStatus}</p>
        <p>Payment Type:{payment}</p>
        <p>Order Date:{orderDate}</p>
        <p>Products:{JSON.stringify(items)}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { showModal } = state;
  return { showModal };
};

const mapDispatchToProps = {
  setModalVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
