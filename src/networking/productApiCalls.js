import axios from '../utils/axios';
import { BASE_PRODUCT_URL } from '../utils/utils';

const productApiCalls = {

  URL: {
    PAGE: 'page.php',
    QUANTITY: 'quantity.php',
    GET: 'get.php',
    UPDATE: 'update.php',
    UPLOAD_IMAGE: 'upload-image.php',
  },

  // Lấy danh sách sản phẩm theo trang
  async getPage(page, amount) {
    try {
      const params = `?page=${page}&amount=${amount}`;
      const response = await axios.get(BASE_PRODUCT_URL + this.URL.PAGE + params);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },
  // lấy tổng số lượng sản phẩm
  async getQuantity() {
    try {
      const response = await axios.get(BASE_PRODUCT_URL + this.URL.QUANTITY);
      return response?.data;
    } catch (error) {
      return { status: 500, message: error.message };
    }
  },

  // lấy thông tin sản phẩm bằng mã sản phẩm
  async get(maSanPham) {
    try {
      const params = `?maSanPham=${maSanPham}`;
      const response = await axios.get(BASE_PRODUCT_URL + this.URL.GET + params);
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

      const response = await axios.put(BASE_PRODUCT_URL + this.URL.UPDATE, urlEncodedData, {
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
      const response = await axios.post(BASE_PRODUCT_URL + this.URL.UPLOAD_IMAGE, formData, {
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
