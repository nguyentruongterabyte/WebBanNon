/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import hooks from '~/hooks';
import styles from './SearchBar.module.scss';
import icons from '~/assets/icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import ResultItem from './ResultItem';

const cx = classNames.bind(styles);

export function SearchBar({ className }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const { search } = hooks.useProductApiCalls();

  const debounced = hooks.useDebounce(searchValue, 700);
  const inputRef = useRef();

  const searchProducts = async (keyword) => {
    const data = await search(keyword);
    return data;
  };

  useEffect(() => {
    if (!debounced) {
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const data = await searchProducts(debounced);

      if (data.status === 200) {
        setSearchResult(data.result);
        console.log(data.result);
      }

      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  useEffect(() => {
    // console.log(searchResult);
  }, [searchResult]);

  const handleClear = () => {
    setSearchValue('');
    inputRef?.current?.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div className={cx({ [className]: className })}>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Sản phẩm</h4>
              {searchResult.map((result) => (
                <ResultItem key={result.maSanPham} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div>
          <div className={cx('search-on-mobile-tablet', 'search')}>
            <input
              ref={inputRef}
              value={searchValue}
              placeholder="Search"
              spellCheck={false}
              onChange={handleChange}
              onFocus={() => setShowResult(true)}
            />
            {!!searchValue && !loading && (
              <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={icons.faCircleXmark} />
              </button>
            )}
            {loading && <FontAwesomeIcon className={cx('loading')} icon={icons.faSpinner} />}
            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </HeadlessTippy>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
};

export default SearchBar;
