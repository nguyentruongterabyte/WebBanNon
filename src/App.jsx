import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerManager from './pages/CustomerManager';
import OrderHistory from './pages/OrderHistory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerManager />} />
        <Route path="/order/history/:customerId" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
