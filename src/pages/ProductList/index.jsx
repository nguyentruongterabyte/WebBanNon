import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';

import ProductItem from '~/components/ProductItem';
import hooks from '~/hooks';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(1);
  const { getQuantity, getPage } = hooks.useProductApiCalls();

  useEffect(() => {
    const fetchQuantiy = async () => {
      const data = await getQuantity();
      if (data.status === 200) {
        setTotalItems(data.result);
      } else {
        toast.warn(data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };
    fetchQuantiy();
  }, [getQuantity]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPage(currentPage, itemsPerPage);
      if (data.status === 200) {
        setProducts(data.result);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, getPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPaginationItems = () => {
    const maxVisiblePages = totalPages;
    const pageItems = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let number = startPage; number <= endPage; number++) {
      pageItems.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return pageItems;
  };

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

  return (
    <Container>
      {chunk(products, 4).map((rowProducts, index) => (
        <Row key={index}>
          {rowProducts.map((product) => (
            <Col key={product.maSanPham} sm={6} md={4} lg={3}>
              <ProductItem isUser={true} data={product} />
            </Col>
          ))}
        </Row>
      ))}
      <Pagination className="justify-content-center mt-3">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {renderPaginationItems()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default ProductList;
