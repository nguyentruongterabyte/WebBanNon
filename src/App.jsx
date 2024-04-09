import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

import NavbarCustomer from './components/Navbar/NavbarCustomer';
import ProductItem from './components/ProductItem/ProductItem';

import axios from './utils/axios';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('products-quantity.php');
        if (response.data.success) {
          setProductsLength(response.data.totalProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(productsLength / itemsPerPage);

  useEffect(() => {
    if (currentPage < 1) setCurrentPage(1);

    const fetchData = async () => {
      try {
        const requestBody = `page=${currentPage}&amount=${itemsPerPage}`;
        const response = await axios.post('products-page.php', requestBody, {
          'Content-type': 'application/x-www-form-urlencoded',
        });

        if (response.data.success) {
          setProducts(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavbarCustomer />
      <Container>
        {chunk(products, 4).map((rowProducts, index) => (
          <Row key={index}>
            {rowProducts.map((product) => (
              <Col key={product.maSanPham} sm={6} md={4} lg={3}>
                {/* Render your product card here */}
                <ProductItem data={product} />
              </Col>
            ))}
          </Row>
        ))}
        <Pagination>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
}

export default App;
