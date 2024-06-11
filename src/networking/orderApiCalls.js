import axios from '~/utils/axios';
import { api } from '~/config/constants';

const orderApiCalls = {

  // Lấy lịch sử đơn hàng của 1 người dùng
  async getOrderHistory(customerId) {
    try {
      const response = await axios.get(`${api.order.history}?userId=${customerId}`);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // Tạo đơn hàng
  async create( formData ) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');
      // console.log(urlEncodedData);

      const response = await axios.post(api.order.create, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  async getAllOrder() {
    try {
      const response = await axios.get(`${api.order.getAllOrder}`);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
  async updateStatus(formData) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');

      const response = await axios.put(api.order.updateStatus, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
};

export default orderApiCalls;
