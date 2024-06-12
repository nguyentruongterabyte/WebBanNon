import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Tab, Tabs } from 'react-bootstrap';

import './OrderHistory.css'; // Import CSS file
import hooks from '~/hooks';
import styles from '~/pages/OrderManager/OrderManager.module.scss';
import OrderItem from '~/components/OrderItem';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const OrderHistory = () => {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const { updateStatus, getOrderHistory } = hooks.useOrderApiCalls();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrderHistory(customerId);
      if (data.status === 200) {
        setOrders(data.result);
      }
    };

    fetchOrders();
  }, [customerId, getOrderHistory]);

  const handleStatusChange = async (orderId, newStatus) => {
    const confirmChange = window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái?');
    if (confirmChange) {
      const formData = {
        maDonHang: orderId,
        trangThai: newStatus,
      };
      const data = await updateStatus(formData);
      if (data?.status === 200) {
        const updatedOrders = await getOrderHistory(customerId);
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

    // <Container>
    //   <h2>Order History</h2>
    //   {loading ? (
    //     <p className="loading">Loading...</p>
    //   ) : orders.length === 0 ? (
    //     <p className="empty-message">Đơn hàng trống</p>
    //   ) : (
    //   <div className="order-history">
    //     {orders.map((order) => (
    //       <div className="order-details" key={order.maDonHang}>
    //         <h3>Order ID: {order.maDonHang}</h3>
    //         <p>Username: {order.username}</p>
    //         <p>Address: {order.diaChi}</p>
    //         <p>Quantity: {order.soLuong}</p>
    //         <p>Total Price: {order.tongTien}</p>
    //         <p>Phone: {order.soDienThoai}</p>
    //         <p>Email: {order.email}</p>
    //         <p>Status: {order.trangThai}</p>
    //         <p>Order Date: {order.ngayTao}</p>
    //         <div className="items">
    //           <h4>Items</h4>
    //           {order.items.map(item => (
    //             <div className="item" key={item.maSanPham}>
    //               <img src={item.hinhAnh} alt={item.tenSanPham} />
    //               <div className="item-details">
    //                 <p><strong>{item.tenSanPham}</strong></p>
    //                 <p>Price: {item.giaSanPham}</p>
    //                 <p>Quantity: {item.soLuong}</p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // )}
    // </Container>
  );
};

export default OrderHistory;
