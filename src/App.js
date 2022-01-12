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

  const [largeImageUrl, setLargeImage] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalOpen, setModal] = useState(false);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const { data } = await ApiService.searchQuery(page, query);
        return {
          //         setItems(prevImages => [...prevImages, ...data.hits]);
          // setLoading(false);
          // setError(null);
        };
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    if (query) {
      fetchQuery();
    }
  }, [query, page]);

  const searchQuery = useCallback(({ query }) => {
    const newState = { query, page: 1 };
    if (query !== query) {
      setLoading(true);
    }
  }, []);

  const openModal = useCallback((id) => {
    setState((prevState) => {
      const { items } = prevState;
      const { largeImageURL } = items.find(item => item.id === id);
      return {
        ...state,
        modalOpen: true,
        largeImageURL,
      }
    })
  }, [items]);

  const closeModal = () => {
    setModal(false);
  };

  const loadMore = () => {
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
          <img className={modalImage} src={largeImageURL} alt={query} />
        </Modal>
      )}
    </>
  );
}

export default App;