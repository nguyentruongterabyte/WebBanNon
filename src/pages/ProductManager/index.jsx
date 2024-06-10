import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import { toast } from 'react-toastify';

import ProductItem from '../../components/ProductItem';
import productApiCalls from '../../networking/productApiCalls';
import EditProduct from '../../components/EditProduct';
import Button from 'react-bootstrap/Button';
import './ProductManager.css';


const ProductManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(1);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [maSanPham, setMaSanPham] = useState(undefined);

  const editProductRef = useRef(null);

  useEffect(() => {
    const fetchQuantiy = async () => {
      const data = await productApiCalls.getQuantity();
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await productApiCalls.getPage(currentPage, itemsPerPage);
      if (data.status === 200) {
        setProducts(data.result);
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

  const handleClose = () => {
    setShow(false);
    setMaSanPham(null);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  const handleEditProduct = (maSP) => {
    setShow(true);
    setMaSanPham(maSP);
  };

  const handleSaveChanges = () => {
    if (editProductRef.current) {
      editProductRef.current.saveChanges();
    }
    handleClose();
    handleCloseAdd();
  };

  const handleAddClick = () => {
    setShowAdd(true);
  };

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

  return (
    <>
      <Container>
        {chunk(products, 4).map((rowProducts, index) => (
          <Row className="row-chunk" key={index}>
            {rowProducts.map((product) => (
              <Col key={product.maSanPham} sm={6} md={4} lg={3}>
                <ProductItem data={product} onClickButtonEdit={() => handleEditProduct(product.maSanPham)} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <Modal centered size='lg' fullscreen show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && maSanPham ? <EditProduct ref={editProductRef} maSanPham={maSanPham} /> : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showAdd ? <EditProduct ref={editProductRef} isCreate={true} /> : <></>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
      <Button size="lg" variant="warning" className="manager__btn-add" onClick={handleAddClick}>
        Thêm sản phẩm
      </Button>
      <Pagination className="justify-content-center mt-3">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {renderPaginationItems()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </>
  );
};

export default ProductManager;
