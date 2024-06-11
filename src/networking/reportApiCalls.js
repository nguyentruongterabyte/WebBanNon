import axios from '~/utils/axios';
import { api } from '~/config/constants';

const reportApiCalls = {
  async getRevenue(year) {
    try {
      const params = `?year=${year}`;
      const response = await axios.get(api.reports.getRevenue + params);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
  async getMostProducts(year) {
    try {
      const params = `?year=${year}`;
      const response = await axios.get(api.reports.products + params);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
};

export default reportApiCalls;
