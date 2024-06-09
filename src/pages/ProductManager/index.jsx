import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';

import ProductItem from '../../components/ProductItem';

import productApiCalls from '../../networking/productApiCalls';
import EditProduct from '../../components/EditProduct';
import Button from 'react-bootstrap/Button';

import './ProductManager.css';

const ProductManager = () => {
  const [currentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [maSanPham, setMaSanPham] = useState(undefined);
  const [totalPages, setTotalPages] = useState(1);

  const editProductRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch total quantity of products
      const quantityResponse = await productApiCalls.getQuantity();
      if (quantityResponse.status === 200) {
        const totalQuantity = quantityResponse.result; // Adjust according to your API response structure
        const totalPages = Math.ceil(totalQuantity / itemsPerPage);
        setTotalPages(totalPages);
      }

      // Fetch products for the current page
      const productsResponse = await productApiCalls.getPage(currentPage, itemsPerPage);
      if (productsResponse.status === 200) {
        setProducts(productsResponse.result);
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
  }

  return (
    <>
      <Container>
        {chunk(products, 4).map((rowProducts, index) => (
          <Row key={index}>
            {rowProducts.map((product) => (
              <Col key={product.maSanPham} sm={6} md={4} lg={3}>
                {/* Render your product card here */}
                <ProductItem data={product} onClickButtonEdit={() => handleEditProduct(product.maSanPham)} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <EditProduct maSanPham={maSanPham}/> */}
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
        <Modal.Body>
          {/* <EditProduct maSanPham={maSanPham}/> */}
          {showAdd ? <EditProduct ref={editProductRef} isCreate={true}/> : <></>}
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>

        </Modal.Footer>
      </Modal>

      <Button size='lg' variant='warning' className='manager__btn-add' onClick={handleAddClick}>Thêm sản phẩm</Button>
      
    </>
  );
};

export default ProductManager;
