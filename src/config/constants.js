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
    quantity: 'api/product/quantity'
  },
  user: {
    resetPassword: 'api/user/reset-password',
    login: 'api/user/login',
    register: 'api/user/register',
    resetPasswordRequest: 'api/user/reset-password-request',
    refreshToken: 'api/user/refresh-token',
    getAll: 'api/user/get-all'
  },

  order: {
    history: '/api/order/history',
  },
}

export const BASE_URL = import.meta.env.VITE_BASE_URL;
// Roles
export const ROLES = {
  admin: 1,
  user: 2,
};