import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.close);
  }

  close = (e) => {
    if (e.code === "Escape") {
      return this.props.closeModal();
    }
  };

  onCloseModal = (e) => {
    const { currentTarget, target } = e;
    if (currentTarget === target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.onCloseModal}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
