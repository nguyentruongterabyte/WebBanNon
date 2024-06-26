import icons from '~/assets/icons';
import routes from './routes';

export const api = {
  product: {
    create: 'api/product/create',
    delete: 'api/product/delete',
    update: 'api/product/update',
    uploadImage: 'api/product/upload-image',
    page: 'api/product/page',
    featured: 'api/product/featured',
    get: 'api/product/get',
    search: 'api/product/search',
    quantity: 'api/product/quantity',
  },
  user: {
    resetPassword: 'api/user/reset-password',
    login: 'api/user/login',
    register: 'api/user/register',
    resetPasswordRequest: 'api/user/reset-password-request',
    refreshToken: 'api/user/refresh-token',
    getAll: 'api/user/get-all',
    get: 'api/user/get',
  },

  order: {
    history: 'api/order/history',
    getAllOrder: 'api/order/history-all',
    updateStatus: 'api/order/update-status',
    create: 'api/order/create',
    cancelOrder: 'api/order/cancel'
  },

  cart: {
    create: 'api/cart/create',
    list: 'api/cart/list',
    deleteProduct: 'api/cart/delete-product',
    updateProduct: 'api/cart/update-product',
  },
  reports: {
    getRevenue: 'api/reports/revenue',
    products: 'api/reports/products',
  },
};

// Default image url
export const DEFAULT_IMAGE_TEMPLATE_URL = import.meta.env.VITE_DEFAULT_IMAGE_TEMPLATE_URL ?? 'https://picsum.photos/200/300';

// Base url
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// Roles
export const ROLES = {
  admin: 1,
  user: 2,
};

// Menu sidebar
export const SIDEBAR_ADMIN_MENU = [
  {
    path: routes.homeHasLogged,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.customer,
    name: 'Khách hàng',
    icon: icons.faUser,
  },
  {
    path: routes.productManager,
    name: 'Sản phẩm',
    icon: icons.faHatCowboy,
  },
  {
    path: routes.orderManager,
    name: 'Đơn hàng',
    icon: icons.faTruckFast,
  },
  {
    path: routes.chart,
    name: 'Thống kê',
    icon: icons.faChartColumn,
  },
];

export const SIDEBAR_USER_MENU = [
  {
    path: routes.homeHasLogged,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.cartList,
    name: 'Giỏ hàng',
    icon: icons.faCartArrowDown,
  },
  {
    path: routes.productList,
    name: 'Sản phẩm',
    icon: icons.faHatCowboy,
  },
  {
    path: routes.orderList,
    name: 'Đơn mua',
    icon: icons.faTruckFast,
  },
];

// Account menu items
export const ACCOUNT_MENU_ITEMS = [
  {
    icon: icons.faEarthAsia,
    title: 'Tiếng việt',
    children: {
      title: 'Ngôn ngữ',
      data: [
        {
          title: 'English',
          type: 'language',
          code: 'en',
          separate: true,
        },
        {
          title: 'Tiếng Việt',
          type: 'language',
          code: 'vi',
        },
      ],
    },
  },
  {
    icon: icons.faKeyboard,
    title: 'Phím tắt',
  },
  {
    icon: icons.faAddressCard,
    title: 'Hồ sơ của tôi',
    type: 'viewProfile',
  },
  {
    icon: icons.faCircleQuestion,
    title: 'Phản hồi và trợ giúp',
    to: '/feedback',
  },
  {
    icon: icons.faRightFromBracket,
    title: 'Đăng xuất',
    type: 'logout',
    separate: true,
  },
];

// Regex pattern
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
