import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './OrderDetailItem.module.scss';
import Utils from '~/utils/Utils';
import { Image } from 'react-bootstrap';

const cx = classNames.bind(styles);

const OrderDetailItem = ({ item }) => {
  return (
    <tr>
      <td>
        <Image
          width={100}
          height={50}
          className={cx('order_item-image')}
          rounded
          src={item.hinhAnh}
          alt={item.tenSanPham}
        />
      </td>
      <td>
        {' '}
        <span className={cx('order__item-name')}>{item.tenSanPham}</span>
      </td>
      <td>{item.soLuong}</td>
      <td>{Utils.formatCurrency(Number(item.giaSanPham) * Number(item.soLuong))}</td>
    </tr>
  );
};

OrderDetailItem.propTypes = {
  item: PropTypes.object
}

export default OrderDetailItem;
