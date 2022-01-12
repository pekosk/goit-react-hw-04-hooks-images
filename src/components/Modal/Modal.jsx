import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

function Modal({ closeModal, children}) {
  useEffect(
    () => {
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []
  );

  const close = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  const onCloseModal = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

    return (
      <div className={styles.overlay} onClick={onCloseModal}>
        {children}
      </div>
    );
}

export default Modal;
