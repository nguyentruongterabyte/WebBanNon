import axios from '~/utils/axios';
import { api } from '~/config/constants';

const userApiCalls = {
  // Đăng nhập
  async login(formData) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');

      const response = await axios.post(api.user.login, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  async getAll() {
    try {
      const response = await axios.get(api.user.getAll);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

};
export default userApiCalls;


