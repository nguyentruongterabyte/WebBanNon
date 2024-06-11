import { useMemo } from 'react';
import { api } from '~/config/constants';
import useAxiosPrivate from './useAxiosPrivate';

const useUserApiCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const UserApiCalls = useMemo(
    () => ( {
      
      async forgot( email ) {
        const urlEncodedData = `email=${ encodeURIComponent( email ) }`;
        try {
          const response = await axiosPrivate.post(api.user.resetPasswordRequest, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Đăng nhập
      async login(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');

          const response = await axiosPrivate.post(api.user.login, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
      //lấy danh sách customer
      async getAll() {
        try {
          const response = await axiosPrivate.get(api.user.getAll);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Lấy thông tin customer
      async get(userId) {
        try {
          const response = await axiosPrivate.get(api.user.get + `?userId=${userId}`);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },

      // Đăng ký
      async register(formData) {
        try {
          const urlEncodedData = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
          const response = await axiosPrivate.post(api.user.register, urlEncodedData, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
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
  return UserApiCalls;
};

export default useUserApiCalls;
