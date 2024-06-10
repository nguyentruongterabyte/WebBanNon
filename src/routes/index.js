import config from '~/config';
import { layouts } from '~/layouts';

import Login from '~/pages/Login';
import Home from '~/pages/Home';
import CustomerManager from '~/pages/CustomerManager';
import OrderHistory from '~/pages/OrderHistory';
import ProductManager from '~/pages/ProductManager';
import ProductList from '~/pages/ProductList';
import ProductDetail from '~/pages/ProductDetail';

const ROLES = config.constants.ROLES;
const routes = config.routes;

const publicRoutes = [
  { path: routes.login, component: Login, layout: layouts.LoginLayout },
  { path: routes.home, component: Home },
];

const privateRoutes = [
  { path: routes.homeHasLogged, component: Home, allowedRoles: [ROLES.admin, ROLES.user], layout: layouts.HasSideBarLayout },
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
    allowedRole: [ROLES.admin, ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
];

export { publicRoutes, privateRoutes };
