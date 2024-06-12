import { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './OrderManager.module.scss';
import OrderItem from '~/components/OrderItem';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const { getAllOrder, updateStatus } = hooks.useOrderApiCalls();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrder();
      if (data?.status === 200) {
        setOrders(data.result);
      }
    };
    fetchData();
  }, [getAllOrder]);

  const handleStatusChange = async (orderId, newStatus) => {
    const confirmChange = window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái?');
    if (confirmChange) {
      const formData = {
        maDonHang: orderId,
        trangThai: newStatus,
      };
      const data = await updateStatus(formData);
      if (data?.status === 200) {
        const updatedOrders = await getAllOrder();
        if (updatedOrders?.status === 200) {
          setOrders(updatedOrders.result);
          toast.success(data?.message);
        }
      } else {
        console.error('Error updating status:', data?.message);
        toast.error(data?.message);
      }
    }
  };

  const renderOrder = (status = 'Tất cả') => {
    return orders.length > 0 ? (
      <ul className={cx('order-list')}>
        {status === 'Tất cả'
          ? orders.map((order) => (
              <OrderItem key={order.maDonHang} data={order} handleStatusChange={handleStatusChange} />
            ))
          : orders
              .filter((order) => order.trangThai === status)
              .map((order) => (
                <OrderItem key={order.maDonHang} data={order} handleStatusChange={handleStatusChange} />
              ))}
      </ul>
    ) : (
      <div>Không có đơn hàng nào</div>
    );
  };

  return (
    <div>
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
    </div>
  );
};

export default OrderManager;
