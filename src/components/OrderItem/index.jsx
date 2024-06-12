import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './OrderItem.module.scss';
import Utils from '~/utils/Utils';
import { Button, Form, FormGroup, Table } from 'react-bootstrap';
import OrderDetailItem from '../OrderDetailItem';
import { toast } from 'react-toastify';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const OrderItem = ({ data, handleStatusChange, isUser = false }) => {
  
  const { cancelOrder } = hooks.useOrderApiCalls();
  
  const handleCancelOrder = async () => {
    const confirmChange = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng?');
    if (confirmChange) {
      const data = await cancelOrder(data.maDonHang);
      if (data.status === 200) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <li className={cx('order-item')}>
      <h5>ID đơn hàng: {data.maDonHang}</h5>
      <p>
        <span>Ngày đặt:</span> {data.ngayTao}
      </p>
      <p>
        <span>Khách hàng:</span> {data.username}
      </p>
      <p>
        <span>Địa chỉ:</span> {data.diaChi}
      </p>
      <p>
        <span>Số điện thoại:</span> {data.soDienThoai}
      </p>
      <p>
        <span>Tổng tiền:</span> {Utils.formatCurrency(Number(data.tongTien))}
      </p>
      <div>
        <span>Trạng thái: </span>
        {isUser ? (
          <FormGroup className={cx('status-section')}>
            <Form.Control
              className={cx(
                data.trangThai === 'Chờ xác nhận'
                  ? 'select-option-1'
                  : data.trangThai === 'Đang giao'
                  ? 'select-option-2'
                  : data.trangThai === 'Đã giao'
                  ? 'select-option-3'
                  : 'select-option-4',
                'order-status',
              )}
              disabled
              value={data.trangThai}
            />
            {data.trangThai === 'Chờ xác nhận' ? (
              <Button variant="outline-warning" className={cx('btn-cancel')} onClick={handleCancelOrder}>
                Hủy đơn hàng
              </Button>
            ) : (
              <></>
            )}
          </FormGroup>
        ) : (
          <select
            value={data.trangThai}
            className={cx(
              data.trangThai === 'Chờ xác nhận'
                ? 'select-option-1'
                : data.trangThai === 'Đang giao'
                ? 'select-option-2'
                : data.trangThai === 'Đã giao'
                ? 'select-option-3'
                : 'select-option-4',
            )}
            onChange={(e) => handleStatusChange(data.maDonHang, e.target.value)}
          >
            <option className={cx('select-option-1')} value="Chờ xác nhận">
              Chờ xác nhận
            </option>
            <option className={cx('select-option-2')} value="Đang giao">
              Đang giao
            </option>
            <option className={cx('select-option-3')} value="Đã giao">
              Đã giao
            </option>
            <option className={cx('select-option-4')} value="Đã hủy">
              Đã hủy
            </option>
          </select>
        )}
      </div>
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
          {data?.items?.map((item) => (
            <OrderDetailItem key={item.maSanPham} item={item} />
          ))}
        </tbody>
      </Table>
    </li>
  );
};

OrderItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleStatusChange: PropTypes.func,
  isUser: PropTypes.bool,
};

export default OrderItem;
