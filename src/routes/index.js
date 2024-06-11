import config from '~/config';
import { layouts } from '~/layouts';

import Login from '~/pages/Login';
import Home from '~/pages/Home';
import CustomerManager from '~/pages/CustomerManager';
import OrderHistory from '~/pages/OrderHistory';
import ProductManager from '~/pages/ProductManager';
import ProductList from '~/pages/ProductList';
import ProductDetail from '~/pages/ProductDetail';
import Register from '~/pages/Register';
import CartProduct from '~/pages/CartProduct';
import Order from '~/pages/Order';
import CustomerOrderList from '~/pages/CustomerOrderList';

const ROLES = config.constants.ROLES;
const routes = config.routes;

const publicRoutes = [
  { path: routes.login, component: Login, layout: layouts.LoginLayout },
  { path: routes.register, component: Register, layout: layouts.LoginLayout },
  { path: routes.home, component: Home },
];

const privateRoutes = [
  {
    path: routes.homeHasLogged,
    component: Home,
    allowedRoles: [ROLES.admin, ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: routes.customerOrderList,
    component: CustomerOrderList,
    allowedRoles: [ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: routes.order,
    component: Order,
    allowedRoles: [ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  { path: routes.customer, component: CustomerManager, allowedRoles: [ROLES.admin], layout: layouts.HasSideBarLayout },
  {
    path: routes.orderHistory,
    component: OrderHistory,
    allowedRoles: [ROLES.user, ROLES.admin],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: routes.productManager,
    component: ProductManager,
    allowedRoles: [ROLES.admin],
    layout: layouts.HasSideBarLayout,
  },
  { path: routes.productList, component: ProductList, allowedRoles: [ROLES.user], layout: layouts.HasSideBarLayout },
  {
    path: routes.productDetail,
    component: ProductDetail,
    allowedRoles: [ROLES.admin, ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  { path: routes.cartList, component: CartProduct, allowedRoles: [ROLES.user], layout: layouts.HasSideBarLayout },
];

export { publicRoutes, privateRoutes };
