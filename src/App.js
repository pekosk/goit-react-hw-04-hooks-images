import { useState, useEffect } from 'react';
import { ApiService } from './api/api';

import styles from './App.module.css';

import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from "react-loader-spinner";
import ImageGallery from './components/ImageGallery';



function App() {
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalOpen, setModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    const onSearch = async () => {
      setLoading(true);
      try {
        const data = await ApiService.fetchImages({ query, page });

        if (!data.hits.length) {
          throw new Error("Sorry we can't find anything");

        }
        if (data?.hits.length > 11) {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setLoading(false);
      }
    };
    onSearch();
  }, [query, page]);

  const searchQuery = (item) => {
    setQuery(item);
    setImages([]);
    setPage(1);
  }

  const openModal = (url) => {
    setLargeImage(url);
    setModal(true);
    console.log(url);
  };


  const closeModal = () => {
    setModal(false);
  };

  const loadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const showBtn = images.length >= 12 && !loading;
  return (
    <>
      <Searchbar onSubmit={searchQuery} />
      {!error && <ImageGallery onClick={openModal} images={images} />}
      {showBtn && <Button onLoadMore={loadMore} title="Load More" />}
      {loading && <div className={styles.loader}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>}
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <img className={styles.modalImage} src={largeImageURL} alt={query} />
        </Modal>
      )}
    </>
  );
}

export default App;