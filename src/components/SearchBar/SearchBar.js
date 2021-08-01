import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChangeInput = ({ currentTarget: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <header className={s.searchBar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button className={s.searchButton} type="submit">
          <span className={s.buttonLabel}>Search</span>
        </button>
        <input
          className={s.formInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
