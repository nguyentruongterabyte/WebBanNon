import { useMemo } from 'react';
import { api } from '~/config/constants';
import useAxiosPrivate from './useAxiosPrivate';

const useOrderApiCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const orderApiCalls = useMemo(
    () => ({
      // Lấy lịch sử đơn hàng của 1 người dùng
      async getOrderHistory(customerId) {
        try {
          const response = await axiosPrivate.get(`${api.order.history}?userId=${customerId}`);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Tạo đơn hàng
      async create(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
          // console.log(urlEncodedData);

          const response = await axiosPrivate.post(api.order.create, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Lấy tất cả các đơn hàng
      async getAllOrder() {
        try {
          const response = await axiosPrivate.get(`${api.order.getAllOrder}`);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Cập nhật trạng thái đơn hàng
      async updateStatus(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');

          const response = await axiosPrivate.put(api.order.updateStatus, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
      // Hủy đơn hàng
      async cancelOrder(orderId) {
        try {
          const urlEncodedData = `maDonHang=${orderId}`;
          const response = await axiosPrivate.put(api.order.cancelOrder, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
    }),
    [axiosPrivate],
  );
  return orderApiCalls;
};

export default useOrderApiCalls;
