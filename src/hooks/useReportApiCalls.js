import { useMemo } from 'react';
import { api } from '~/config/constants';
import useAxiosPrivate from './useAxiosPrivate';

const useReportApiCalls = () => {
  const axiosPrivate = useAxiosPrivate();

  const reportApiCalls = useMemo(
    () => ({
      async getRevenue(year) {
        try {
          const params = `?year=${year}`;
          const response = await axiosPrivate.get(api.reports.getRevenue + params);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
      async getMostProducts(year) {
        try {
          const params = `?year=${year}`;
          const response = await axiosPrivate.get(api.reports.products + params);
          return response?.data;
        } catch (error) {
          return { status: 500, message: error.message };
        }
      },
    }),
    [axiosPrivate],
  );
  return reportApiCalls;
};

export default useReportApiCalls;
