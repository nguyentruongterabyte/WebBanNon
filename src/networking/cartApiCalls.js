import axios from '~/utils/axios';
import { api } from '~/config/constants';

const cartApiCalls = {
  // Tạo giỏ hàng
  async createCart(formData) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');

      const response = await axios.post(api.cart.create, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // Xóa giỏ hàng
  async deleteProduct(userId, productId) {
    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('maSanPham', productId);
      urlEncodedData.append('userId', userId);

      console.log(urlEncodedData);
      const response = await axios.delete(api.cart.deleteProduct, {
        data: urlEncodedData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // Chỉnh sửa giỏ hàng
  async updateCart(formData) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');
      // console.log(urlEncodedData);

      const response = await axios.put(api.cart.updateProduct, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // Lấy danh sách giỏ hàng theo id người dùng
  async getCart(userId) {
    try {
      const params = `?userId=${userId}`;
      const response = await axios.get(api.cart.list + params);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
};

export default cartApiCalls;
