import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import CustomerItem from '../../components/CustomerItem';
import hooks from '~/hooks';
import { Table } from 'react-bootstrap';

const CustomerManager = () => {
  const [currentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [itemsPerPage] = useState(20);
  const { getAll } = hooks.useUserApiCalls();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll();
      if (data.status === 200) {
        setCustomers(data.result);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, getAll]);

  const handleDetails = (customerId) => {
    navigate(`/order/history/${customerId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID khách hàng</th>
          <th>Tên khách hàng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Xem đơn mua</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <CustomerItem key={customer.id} data={customer} onClickDetails={handleDetails} />
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerManager;
