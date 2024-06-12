import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import classNames from 'classnames/bind';

import OrderItem from '~/components/OrderItem';
import styles from './CustomerOrder.module.scss';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const CustomerOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = hooks.useJWTDecode();
  const { getOrderHistory } = hooks.useOrderApiCalls();

  useEffect(() => {
    const getAllOrder = async () => {
      const data = await getOrderHistory(user);
      if (data?.status === 200) {
        setOrders(data.result);
      }
    };
    getAllOrder();
  }, [user, getOrderHistory]);
  const renderOrder = (status = 'Tất cả') => {
    return orders.length > 0 ? (
      <ul className={cx('order-list')}>
        {status === 'Tất cả'
          ? orders.map((order) => <OrderItem key={order.maDonHang} data={order} isUser />)
          : orders
              .filter((order) => order.trangThai === status)
              .map((order) => <OrderItem key={order.maDonHang} data={order} isUser />)}
      </ul>
    ) : (
      <div>Không có đơn hàng nào</div>
    );
  };
  return (
    <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="tab1" title="Tất cả">
        <div>{renderOrder()}</div>
      </Tab>
      <Tab eventKey="tab2" title="Chờ xác nhận">
        <div>{renderOrder('Chờ xác nhận')}</div>
      </Tab>
      <Tab eventKey="tab3" title="Đang giao">
        <div>{renderOrder('Đang giao')}</div>
      </Tab>
      <Tab eventKey="tab4" title="Đã giao">
        <div>{renderOrder('Đã giao')}</div>
      </Tab>
      <Tab eventKey="tab5" title="Đã hủy">
        <div>{renderOrder('Đã hủy')}</div>
      </Tab>
    </Tabs>
  );
};

export default CustomerOrderList;
