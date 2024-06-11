import useAuth from './useAuth';
import useInput from './useInput';
import useLocalStorage from './useLocalStorage';
import useToggle from './useToggle';
import useDebounce from './useDebounce';
import useJWTDecode from './useJWTDecode';
import useAxiosPrivate from './useAxiosPrivate';
import useRefreshToken from './useRefreshToken';
import useLogout from './useLogout';

import useCartApiCalls from './useCartApiCalls';
import useOrderApiCalls from './useOrderApiCalls';
import useProductApiCalls from './useProductApiCalls';
import useReportApiCalls from './useReportApiCalls';
import useUserApiCalls from './useUserApiCalls';

const hooks = {
  useUserApiCalls,
  useReportApiCalls,
  useProductApiCalls,
  useOrderApiCalls,
  useCartApiCalls,
  useAuth,
  useInput,
  useLocalStorage,
  useToggle,
  useDebounce,
  useJWTDecode,
  useAxiosPrivate,
  useRefreshToken,
  useLogout,
};

export default hooks;
