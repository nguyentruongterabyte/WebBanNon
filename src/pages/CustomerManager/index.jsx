import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomerItem from '../../components/CustomerItem';
import hooks from '~/hooks';

const CustomerManager = () => {
  const [currentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [ itemsPerPage ] = useState( 20 );
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

  const chunk = (arr, size) => {
    if (!arr || arr.length === 0) {
      return [];
    }

    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  const handleDetails = (customerId) => {
    navigate(`/order/history/${customerId}`);
  };

  return (
    <Container>
      {chunk(customers, 4).map((rowCustomers, index) => (
        <Row key={index}>
          {rowCustomers.map((customer) => (
            <Col key={customer.id} sm={6} md={4} lg={3}>
              <CustomerItem data={customer} onClickDetails={handleDetails} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default CustomerManager;
