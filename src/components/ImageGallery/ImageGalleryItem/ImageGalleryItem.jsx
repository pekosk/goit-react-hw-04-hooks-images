import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
import {memo} from "react";

const ImageGalleryItem = ({ onClick, tags, webformatURL }) => {
  return (
    <li className={styles.galleryItem} onClick={onClick}>
      <img className={styles.galleryImg} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);
