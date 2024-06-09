import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import orderApiCalls from '~/networking/orderApiCalls'; // Assuming orderApiCalls is correctly implemented
import './OrderHistory.css'; // Import CSS file

const OrderHistory = () => {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderApiCalls.getOrderHistory(customerId);
      if (data.status === 200) {
        setOrders(data.result);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [customerId]);

  return (
    <Container>
      <h2>Order History</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="empty-message">Đơn hàng trống</p>
      ) : (
      <div className="order-history">
        {orders.map((order) => (
          <div className="order-details" key={order.maDonHang}>
            <h3>Order ID: {order.maDonHang}</h3>
            <p>Username: {order.username}</p>
            <p>Address: {order.diaChi}</p>
            <p>Quantity: {order.soLuong}</p>
            <p>Total Price: {order.tongTien}</p>
            <p>Phone: {order.soDienThoai}</p>
            <p>Email: {order.email}</p>
            <p>Status: {order.trangThai}</p>
            <p>Order Date: {order.ngayTao}</p>
            <div className="items">
              <h4>Items</h4>
              {order.items.map(item => (
                <div className="item" key={item.maSanPham}>
                  <img src={item.hinhAnh} alt={item.tenSanPham} />
                  <div className="item-details">
                    <p><strong>{item.tenSanPham}</strong></p>
                    <p>Price: {item.giaSanPham}</p>
                    <p>Quantity: {item.soLuong}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
    </Container>
  );
};

export default OrderHistory;
