import { useState, useEffect, useCallback } from 'react';
import { ApiService } from './api/api';

import styles from './App.module.css';

import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from "react-loader-spinner";
import ImageGallery from './components/ImageGallery';



function App() {
  // const initialState = {
  //   largeImageURL: "",
  //   items: [],
  //   loading: false,
  //   error: null,
  //   page: 1,
  //   query: "",
  //   modalOpen: false,
  // };

  const [largeImageURL, setLargeImage] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalOpen, setModal] = useState(false);

  useEffect(() => {
    const fetchQuery = async () => {
      setLoading(true);
      try {
        const data = await ApiService.searchQuery(page, query);
        if (data?.hits.length > 11) {
          setItems(prevImages => [...prevImages, ...data.hits]);
          setLoading(false);
        }
        if (!data.hits.length) {
          return alert('Sorry, there are no images matching your search query. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      } finally {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        setLoading(false);
      }
    };

    if (query) {
      fetchQuery();
    }
  }, [query, page]);

  const searchQuery = (item) => {
    setQuery(item);
    setItems([]);
    setPage(1);
  }

  const openModal = (url) => {
    setLargeImage(url)
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  };

  const loadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const showBtn = items.length >= 12 && !loading;
  return (
    <>
      <Searchbar onSubmit={searchQuery} />
      {!error && <ImageGallery onClick={openModal} items={items} />}
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