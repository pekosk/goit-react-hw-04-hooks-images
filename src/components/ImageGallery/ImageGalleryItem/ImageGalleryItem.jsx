import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
import { memo } from "react";

const ImageGalleryItem = ({ image, onClick }) => (
  <li className={styles.galleryItem}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={styles.galleryImg}
      onClick={() => onClick(image.largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);
