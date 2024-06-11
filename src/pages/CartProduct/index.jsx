import { useEffect, useState } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cartApiCalls from '~/networking/cartApiCalls';
import hooks from '~/hooks';

import styles from './CartProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '~/assets/icons';
import Utils from '~/utils/Utils';
import config from '~/config';

const cx = classNames.bind(styles);

const CartProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = hooks.useJWTDecode();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchCart = async () => {
      const data = await cartApiCalls.getCart(user);
      if (data.status === 200) {
        setCartItems(data.result);
      } else {
        toast.error(data.message);
      }
    };

    fetchCart();
  }, [user]);

  const handleDeleteItem = async (productId) => {
    const data = await cartApiCalls.deleteProduct(user, productId);
    if (data.status === 200) {
      setCartItems((prevItems) => prevItems.filter((item) => item.maSanPham !== productId));
      setSelectedItems((prevItems) => prevItems.filter((item) => item.maSanPham !== productId));
    } else {
      console.log(data.message);
    }
  };

  const handleUpdateItem = async (productId, quantity) => {
    if (quantity < 1) return; // Ensure quantity does not go below 1

    const formData = {
      userId: user,
      maSanPham: productId,
      soLuong: quantity,
    };

    const data = await cartApiCalls.updateCart(formData);
    if (data.status === 200) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.maSanPham === productId
            ? {
                ...item,
                giaSanPham: (item.giaSanPham / item.soLuong) * quantity, // Update giaSanPham based on new quantity
                soLuong: quantity,
              }
            : item,
        ),
      );

      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.map((item) =>
          item.maSanPham === productId
            ? {
                ...item,
                giaSanPham: (item.giaSanPham / item.soLuong) * quantity, // Update giaSanPham based on new quantity
                soLuong: quantity,
              }
            : item,
        ),
      );
    } else {
      console.log(data.message);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItems((prevItems) => {
      const isSelected = prevItems.some((i) => i.maSanPham === item.maSanPham);
      if (isSelected) {
        return prevItems.filter((i) => i.maSanPham !== item.maSanPham);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems);
    }
  };

  const totalAmount = selectedItems.reduce((acc, item) => Number(acc) + Number(item.giaSanPham), 0);

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    // Ensure selectedItems are up-to-date with cartItems
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.map(
        (selectedItem) => cartItems.find((cartItem) => cartItem.maSanPham === selectedItem.maSanPham) || selectedItem,
      ),
    );
  }, [cartItems]);

  const handleOrderClick = () => {
    if (selectedItems.length === 0) {
      toast.warn('Bạn vẫn chưa chọn sản phẩm nào để mua');
      return;
    }
    navigate(config.routes.order);
  };

  return (
    <div className={cx('wrapper')}>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedItems.length === cartItems.length} onChange={handleSelectAll} />
            </th>
            <th>Sản phẩm</th>
            <th></th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Số tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.maSanPham}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.some((i) => i.maSanPham === item.maSanPham)}
                  onChange={() => handleSelectItem(item)}
                />
              </td>
              <td colSpan={2}>
                <Image
                  width={100}
                  height={50}
                  className={cx('cart__item-image')}
                  rounded
                  src={item.hinhAnh}
                  alt={item.tenSanPham}
                />
                <span className={cx('cart_item-name')}>{item.tenSanPham}</span>
              </td>
              <td>{Utils.formatCurrency(Number(item.giaSanPham) / item.soLuong)}</td>
              <td>
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => handleUpdateItem(item.maSanPham, Number(item.soLuong) - 1)}
                >
                  -
                </Button>
                <span>{item.soLuong}</span>
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => handleUpdateItem(item.maSanPham, Number(item.soLuong) + 1)}
                >
                  +
                </Button>
              </td>
              <td>{Utils.formatCurrency(Number(item.giaSanPham))}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteItem(item.maSanPham)}>
                  <FontAwesomeIcon icon={icons.faTimes} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <section className={cx('payment-section')}>
        <div className={cx('payment-section__grid')}>
          <div>
            <label className={cx('stardust-checkbox')}>
              <input
                className={cx('stardust-checkbox__input')}
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={handleSelectAll}
              />
            </label>
            <button className={cx('btn-select-all')} onClick={handleSelectAll}>
              {selectedItems.length === cartItems.length ? 'Bỏ chọn tất cả' : `Chọn tất cả (${cartItems.length})`}
            </button>
          </div>
          <div className={cx('total-price')}>
            <span>
              Tổng thanh toán ({selectedItems.length} sản phẩm): <p>{Utils.formatCurrency(totalAmount)}</p>
            </span>
          </div>
        </div>
        <Button className={cx('btn-order')} onClick={handleOrderClick}>
          Mua hàng
        </Button>
      </section>
    </div>
  );
};

export default CartProduct;
