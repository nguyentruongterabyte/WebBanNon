import axios from '~/utils/axios';
import { api } from '~/config/constants';

const productApiCalls = {
  // Lấy danh sách sản phẩm theo trang
  async getPage(page, amount) {
    try {
      const params = `?page=${page}&amount=${amount}`;
      const response = await axios.get(api.product.page + params);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
  // lấy tổng số lượng sản phẩm
  async getQuantity() {
    try {
      const response = await axios.get(api.product.quantity);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // lấy thông tin sản phẩm bằng mã sản phẩm
  async get(maSanPham) {
    try {
      const params = `?maSanPham=${maSanPham}`;
      const response = await axios.get(api.product.get + params);
      return response?.data;
    } catch (error) {
      return { status: 500, messaage: error.message };
    }
  },

  // Chỉnh sửa sản phẩm
  async update(formData) {
    try {
      const urlEncodedData = Object.keys(formData)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
        .join('&');
      // console.log(urlEncodedData);

      const response = await axios.put(api.product.update, urlEncodedData, {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // upload ảnh
  async uploadImage(selectedFile, maSanPham) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('maSanPham', maSanPham);

    try {
      const response = await axios.post(api.product.uploadImage, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
};

export default productApiCalls;
