import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerManager from './pages/CustomerManager';
import OrderHistory from './pages/OrderHistory';
import ProductManager from './pages/ProductManager';
import NavbarCustomer from './components/Navbar/NavbarCustomer';

import { Home } from './pages/Home';
const App = () => {
  return (
    <Router>
      <NavbarCustomer></NavbarCustomer>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<ProductManager />} />
        <Route path="/customer" element={<CustomerManager />} />
        <Route path="/order/history/:customerId" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
