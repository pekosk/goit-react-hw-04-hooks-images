import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";
import { memo } from "react";

const ImageGalleryItem = ({ image, onClick }) => {
  const openLarge = () => onClick(image.largeImageURL);
  return (
    <li className={styles.galleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.galleryImg}
        onClick={openLarge}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default memo(ImageGalleryItem);
