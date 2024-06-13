import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ResultItem = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/product/${data.maSanPham}`, {replace: false});
  };

  return (
    <div className={cx('product-item')} onClick={handleClick}>
      <Image className={cx('product-image')} width={80} height={80} rounded src={data.hinhAnh} />
      <h5 className={cx('product-name')}>{data.tenSanPham}</h5>
    </div>
  );
};

ResultItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ResultItem;
