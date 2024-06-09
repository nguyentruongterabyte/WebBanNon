import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CustomerManager from './pages/CustomerManager';
import OrderHistory from './pages/OrderHistory';
import ProductManager from './pages/ProductManager';
import NavbarCustomer from './components/Navbar/NavbarCustomer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';


import { Home } from './pages/Home';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
  <div>
    <Router>
        <NavbarCustomer/>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<ProductManager />} />
            <Route path="/customer" element={<CustomerManager />} />
            <Route path="/order/history/:customerId" element={<OrderHistory />} />
           <Route path="/product-list" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />


        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </div>
    
  );
};

export default App;
