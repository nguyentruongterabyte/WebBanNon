import React, { useEffect, useState } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';

import cartApiCalls from '~/networking/cartApiCalls';
import { toast } from 'react-toastify';
import hooks from '~/hooks';

import styles from './CartProduct.module.scss';

const cx = classNames.bind(styles);

const CartProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const {user} = hooks.useJWTDecode();

  useEffect(() => {
    const fetchCart = async () => {
      const data = await cartApiCalls.getCart(user);
      if (data.status === 200) {
        setCartItems(data.result);
        console.log(data.result);
      } else {
        toast.error('Failed to fetch cart items');
      }
    };

    fetchCart();
  }, [user]);

  const handleDeleteItem = async (productId) => {
    const data = await cartApiCalls.delete(user, productId);
    if (data.status === 200) {
      toast.success('Product removed from cart');
      setCartItems((prevItems) => prevItems.filter(item => item.maSanPham !== productId));
    } else {
      toast.error('Failed to remove product from cart');
    }
  };

  const handleUpdateItem = async (productId, quantity) => {
    const formData = {
      'userId': user,
      'maSanPham': productId,
      'soLuong': quantity
    }
    const data = await cartApiCalls.updateCart(formData);
    if (data.status === 200) {
      setCartItems((prevItems) => prevItems.map(item => item.maSanPham === productId ? { ...item, soLuong: quantity } : item));
    } else {
      toast.error(data.message);
    }
  };

  console.log(cartItems)
  return (
    <Table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.maSanPham}>
            <td><Image width={100} height={80} className={cx('cart__item-image')} rounded src={item.hinhAnh} alt={item.tenSanPham} /></td>
            <td><span className={cx('cart_item-name')}>{item.tenSanPham}</span></td>
            <td>{item.giaSanPham} VND</td>
            <td>
              <Button variant="light" size="lg" onClick={() => handleUpdateItem(item.maSanPham, Number(item.soLuong) - 1)}>-</Button>
            
              <span >{item.soLuong}</span>
            
              <Button variant="light" size="lg" onClick={() => handleUpdateItem(item.maSanPham, Number(item.soLuong) + 1)}>+</Button>
              </td>
            <td>{item.giaSanPham * item.soLuong} VND</td>
            <td>
              <Button variant="danger" onClick={() => handleDeleteItem(item.maSanPham)}>Remove</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CartProduct;
