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
};

export default orderApiCalls;
