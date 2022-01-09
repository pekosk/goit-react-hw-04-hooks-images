import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ items, onClick }) => {
  const elem = items.map((item) => (
    <ImageGalleryItem
      onClick={() => onClick(item.id)}
      key={item.id}
      {...item}
    />
  ));
  return <ul className={styles.galleryList}>{elem}</ul>;
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
