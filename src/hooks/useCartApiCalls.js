import { useMemo } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { api } from '~/config/constants';

const useCartApiCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const cartApiCalls = useMemo(
    () => ({
      // Tạo giỏ hàng
      async createCart(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');

          const response = await axiosPrivate.post(api.cart.create, urlEncodedData, {
            headers: {
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

          const response = await axiosPrivate.delete(api.cart.deleteProduct, {
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

          const response = await axiosPrivate.put(api.cart.updateProduct, urlEncodedData, {
            headers: {
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
          const response = await axiosPrivate.get(api.cart.list + params);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
    }),
    [axiosPrivate],
  );

  return cartApiCalls;
};

export default useCartApiCalls;
