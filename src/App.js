import { Component } from 'react';
import { ApiService } from './api/api';

import styles from './App.module.css';

import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from "react-loader-spinner";
import ImageGallery from './components/ImageGallery';



class App extends Component {
  state = {
    id: "",
    largeImageURL: "",
    items: [],
    loading: false,
    error: null,
    page: 1,
    query: "",
    modalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, items } = this.state;
    if (prevState.query !== query && query) {
      this.setState({ loading: true, items: [] });
      this.fetchQuery();
    }
    if (items.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  async fetchQuery() {
    const { page, query } = this.state;
    try {
      const { data } = await ApiService.searchQuery(page, query);
      if (!data.hits.length) {
        return alert('Sorry, there are no images matching your search query. Please try again.');
      }
      this.setState(({ items, page }) => {
        return {
          items: [...items, ...data.hits],
          loading: false,
          error: null,
          page: page + 1,
        };
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  }

  searchQuery = ({ query }) => {
    this.setState({ query, page: 1, });
  };

  openModal = (id) => {
    this.setState((prevState) => {
      const { items } = prevState;
      const { largeImageURL } = items.find((item) => item.id === id);
      return {
        modalOpen: true,
        largeImageURL,
      };
    });
  };

  closeModal = (e) => {
    this.setState({ modalOpen: false });
  };

  loadMore = (e) => {
    this.fetchQuery();
  };

  render() {
    const { items, loading, error, query, modalOpen, largeImageURL } = this.state;
    const { searchQuery, closeModal, openModal, loadMore } = this;
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
}

export default App;