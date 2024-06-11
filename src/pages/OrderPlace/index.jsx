import { useEffect, useState } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import Utils from '~/utils/Utils';
import hooks from '~/hooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const OrderPlace = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = hooks.useJWTDecode();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const { create } = hooks.useOrderApiCalls();
  const { get } = hooks.useUserApiCalls();
  const { deleteProduct } = hooks.useCartApiCalls();
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setOrderItems(items);
    const total = items.reduce((acc, item) => acc + Number(item.giaSanPham), 0);
    setTotalAmount(total);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async (userId) => {
      const data = await get(userId);
      if (data?.status === 200) {
        setEmail(data?.result?.email);
        setMobile(data?.result?.mobile);
      }
    };

    fetchUserInfo(user);
  }, [user, get]);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error('Vui lòng nhập địa chỉ giao hàng!');
      return;
    }

    const itemsAmount = orderItems.reduce((acc, item) => acc + Number(item.soLuong), 0);

    const formData = {
      sdt: mobile,
      email,
      tongTien: totalAmount,
      diaChi: address,
      soLuong: itemsAmount,
      userId: user,
      chiTiet: JSON.stringify(orderItems),
    };

    try {
      const data = await create(formData);
      console.log('Order API Response:', data);

      if (data.status === 200) {
        toast.success(data.message);
        await Promise.all(orderItems.map((orderItem) => deleteProduct(user, orderItem.maSanPham)));
        navigate(config.routes.orderList, { replace: true });
        console.log('All items deleted from cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Có lỗi xảy ra khi đặt hàng!');
    }
  };

  return (
    <div className={cx('order-wrapper')}>
      <h2>Order Details</h2>
      <Table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Số tiền</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr key={item.maSanPham}>
              <td>{item.tenSanPham}</td>
              <td>{Utils.formatCurrency(Number(item.giaSanPham) / item.soLuong)}</td>
              <td>{item.soLuong}</td>
              <td>{Utils.formatCurrency(Number(item.giaSanPham))}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={cx('total-section')}>
        <div className={cx('total')}>
          <span>
            Tổng thanh toán: <p>{Utils.formatCurrency(totalAmount)}</p>
          </span>
        </div>
        <InputGroup size="lg">
          <InputGroup.Text className={cx('mobile')} id="inputGroup-sizing-lg">
            Số điện thoại
          </InputGroup.Text>
          <Form.Control disabled aria-label="Large" value={mobile} aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Text className={cx('email')} id="inputGroup-sizing-lg">
            Email
          </InputGroup.Text>
          <Form.Control value={email} disabled aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Text className={cx('address')} id="inputGroup-sizing-lg">
            Nhập địa chỉ giao hàng
          </InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputGroup>
        <Button size="lg" onClick={handlePlaceOrder} className={cx('btn-place-order')}>
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderPlace;
