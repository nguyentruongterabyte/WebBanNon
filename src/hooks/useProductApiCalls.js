import { useMemo } from 'react';
import { api } from '~/config/constants';
import useAxiosPrivate from './useAxiosPrivate';

const useProductApiCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const productApiCalls = useMemo(
    () => ({
      // Lấy danh sách sản phẩm theo trang
      async getPage(page, amount) {
        try {
          const params = `?page=${page}&amount=${amount}`;
          const response = await axiosPrivate.get(api.product.page + params);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
      // lấy tổng số lượng sản phẩm
      async getQuantity() {
        try {
          const response = await axiosPrivate.get(api.product.quantity);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // lấy thông tin sản phẩm bằng mã sản phẩm
      async get(maSanPham) {
        try {
          const params = `?maSanPham=${maSanPham}`;
          const response = await axiosPrivate.get(api.product.get + params);
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
          console.log(urlEncodedData);

          const response = await axiosPrivate.put(api.product.update, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      //xóa sản phẩm
      async deleteProduct(maSanPham) {
        try {
          // Tạo dữ liệu x-www-form-urlencoded
          const urlEncodedData = new URLSearchParams();
          urlEncodedData.append('maSanPham', maSanPham);

          // Gửi yêu cầu DELETE với dữ liệu đã mã hóa
          const response = await axiosPrivate.delete(api.product.delete, {
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

      //them
      async create(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
          // console.log(urlEncodedData);

          const response = await axiosPrivate.post(api.product.create, urlEncodedData, {
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
          const response = await axiosPrivate.post(api.product.uploadImage, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
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
  return productApiCalls;
};

export default useProductApiCalls;
