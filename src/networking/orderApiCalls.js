import axios from '~/utils/axios';
import { api } from '~/config/constants';

const orderApiCalls = {
  async getOrderHistory(customerId) {
    try {
      const response = await axios.get(`${api.order.history}?userId=${customerId}`);
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
