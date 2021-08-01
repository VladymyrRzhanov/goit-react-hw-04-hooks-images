import * as imageApi from '../../services/apiFetch';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import mapper from '../../helpers/mapper';
import ImageGallery from '../ImageGallery';
import Section from '../Section';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    imageApi
      .fetchImg(query, page)
      .then(({ data: { hits } }) => {
        setImages(prevState => [...prevState, ...mapper(hits)]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [query, page]);

  const reset = () => {
    setImages([]);
    setQuery('');
    setPage(1);
  };

  const handleSubmit = query => {
    reset();
    setQuery(query);
  };

  const handleNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (modalImg, tags) => {
    setModalShow(!modalShow);
    setModalImg(modalImg);
    setTags(tags);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Section>
        {error && <h2>{error.message}</h2>}
        {!!images.length && (
          <ImageGallery images={images} onModalOpen={toggleModal} />
        )}
        {loading && <Loader />}
        {images.length % 12 === 0 && !!images.length && (
          <Button onLoadMore={handleNextPage} />
        )}
      </Section>
      {modalShow && (
        <Modal onClose={toggleModal} modalImg={modalImg} tags={tags} />
      )}
    </>
  );
};

export default App;
