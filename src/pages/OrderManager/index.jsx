import { useState, useEffect } from 'react';
import { Image, Tab, Table, Tabs } from 'react-bootstrap';
import orderApiCalls from '~/networking/orderApiCalls';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './OrderManager.module.scss';
import Utils from '~/utils/Utils';

const cx = classNames.bind(styles);

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const getAllOrder = async () => {
      const data = await orderApiCalls.getAllOrder();
      if (data?.status === 200) {
        setOrders(data.result);
      }
    };
    getAllOrder();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const confirmChange = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái?");
    if (confirmChange) {
      const formData = {
        maDonHang: orderId,
        trangThai: newStatus
      };
      const data = await orderApiCalls.updateStatus(formData);
      if (data?.status === 200) {
        const updatedOrders = await orderApiCalls.getAllOrder();
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
      <ul className={cx("order-list")}>
        {status === 'Tất cả' ? orders.map((order) => (
          <li key={order.maDonHang} className={cx("order-item")}>
            <h5>ID đơn hàng: {order.maDonHang}</h5>
            <p><span>Ngày đặt:</span> {order.ngayTao}</p>
            <p><span>Khách hàng:</span> {order.username}</p>
            <p><span>Địa chỉ:</span> {order.diaChi}</p>
            <p><span>Số điện thoại:</span> {order.soDienThoai}</p>
            <p><span>Tổng tiền:</span> {Utils.formatCurrency(Number(order.tongTien))}</p>
            <p>
              <span>Trạng thái: </span>
              <select
                value={order.trangThai}
                onChange={(e) => handleStatusChange(order.maDonHang, e.target.value)}
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th></th>
                  <th>Số lượng</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {order?.items?.map((item) => (<tr key={item.maSanPham}>
                  <td>
                    <Image width={100}
                            height={50}
                            className={cx('order_item-image')}
                            rounded
                            src={item.hinhAnh}
                            alt={item.tenSanPham}/>
                   
                    </td>
                  <td> <span className={cx('order__item-name')}>
                      {item.tenSanPham}
                      
                    </span></td>
                  <td>{item.soLuong}</td>
                  <td>{Utils.formatCurrency(item.giaSanPham)}</td>
                </tr>))}
               
              </tbody>
            </Table>
          </li>
        )) : orders.filter(order => order.trangThai === status).map((order) => (
          <li key={order.maDonHang} className={cx("order-item")}>
            <h5>ID đơn hàng: {order.maDonHang}</h5>
            <p><span>Ngày đặt:</span> {order.ngayTao}</p>
            <p><span>Số điện thoại:</span> {order.username}</p>
            <p><span>Địa chỉ:</span> {order.diaChi}</p>
            <p><span>Số điện thoại:</span> {order.soDienThoai}</p>
            <p><span>Tổng tiền:</span> {Utils.formatCurrency(Number(order.tongTien))}</p>
            <p>
              <span>Status:</span>
              <select
                value={order.trangThai}
                onChange={(e) => handleStatusChange(order.maDonHang, e.target.value)}
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th></th>
                  <th>Số lượng</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {order?.items?.map((item) => (<tr key={item.maSanPham}>
                  <td>
                    <Image width={100}
                            height={50}
                            className={cx('order_item-image')}
                            rounded
                            src={item.hinhAnh}
                            alt={item.tenSanPham}/>
                   
                    </td>
                  <td> <span className={cx('order__item-name')}>
                      {item.tenSanPham}
                      
                    </span></td>
                  <td>{item.soLuong}</td>
                  <td>{Utils.formatCurrency(item.giaSanPham)}</td>
                </tr>))}
               
              </tbody>
            </Table>
          </li>
        ))}
      </ul>
    ) : (
      <div>No orders available</div>
    )
  }

  return (
    <div>
      <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="tab1" title="Tất cả">
          <div>
            {renderOrder()}
          </div>
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
}

export default OrderManager;
