import React, { Component } from "react";
import { connect } from "react-redux";

import SpringSpinner from "@bit/bondz.react-epic-spinners.spring-spinner";
import { setErrorMessage, showLoadingSpinner } from "../../../../../actions";
import { firebase } from "../../../../../utils";

import "./Addonmodal.css";

const addon_image = require("../../../../../assets/addon.png");

const storageService = firebase.storage();
const storageRef = storageService.ref();

export class Addaddonmodal extends Component {
  handleImageUploadChange = () => {
    let src = document.getElementById("select_image");
    let profile = document.getElementById("profile");
    this.uploadImage(src, profile);
  };

  //Upload the image to firebase and return the URL to the image
  //create a child directory called images, and place the file inside this directory
  uploadImage = (src, profile) => {
    let selectedImage = src.files[0];
    const uploadTask = storageRef
      .child(`image/${Date.now() + ".png"}`)
      .put(selectedImage);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress !== 100
          ? this.props.showLoadingSpinner(true)
          : this.props.showLoadingSpinner(false);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("Unknown state");
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
        console.log("error" + error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          //Get the uploaded image's url and set it as the src
          let reader = new FileReader();
          reader.onload = function() {
            profile.src = downloadURL;
          };
          reader.readAsDataURL(src.files[0]);
        });
      }
    );
    uploadTask
      .then(() => console.log("sucessfully uploaded the user image"))
      .catch(error => this.props.setErrorMessage(error));
  };

  handleOnClick = event => {
    event.stopPropagation();
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

    let name = data.get("name");
    let category = data.get("category");
    let description = data.get("description");
    let cost = data.get("cost");
    let image = document.getElementById("profile").src;

    const {
      hideModal,
      modalprops: { createNewAddon }
    } = this.props;

    createNewAddon({ name, category, description, image, cost });
    hideModal();
  };

  render() {
    const { categories, hideModal, errorMessage, spinner } = this.props;
    return (
      <div className="addaddonmodal" onClick={hideModal}>
        <div className="modaltable" onClick={this.handleOnClick}>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={errorMessage.show ? "displayErrors" : ""}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <div id="imageholder">
                      <img
                        id="profile"
                        name="profile"
                        src={addon_image}
                        className="theImage"
                        alt="profilepic"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageUploadChange}
                        id="select_image"
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>NAME:</td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>CATEGORY:</td>
                  <td>
                    <select
                      id="category"
                      name="category"
                      autoComplete="off"
                      required
                    >
                      {categories.map(category => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>DESCRIPTION:</td>
                  <td>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      autoComplete="off"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>COST:</td>
                  <td>
                    <input
                      type="number"
                      id="cost"
                      name="cost"
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
              <button>COMPLETE</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorMessage, categories, spinner } = state;
  return { errorMessage, categories, spinner };
};

const mapDispatchToProps = {
  setErrorMessage,
  showLoadingSpinner
};

export default connect(mapStateToProps, mapDispatchToProps)(Addaddonmodal);
