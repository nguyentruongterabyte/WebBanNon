import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import ProductItem from '../../components/ProductItem';

import productApiCalls from '../../networking/productApiCalls';
import EditProduct from '../../components/EditProduct';
import Button from 'react-bootstrap/Button';

const ProductManager = () => {
  const [currentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const [maSanPham, setMaSanPham] = useState(undefined);

  const editProductRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await productApiCalls.getPage(1, itemsPerPage);
      if (data.status == 200) {
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

  const handleEditProduct = (maSP) => {
    setShow(true);
    setMaSanPham(maSP);
  };

  const handleSaveChanges = () => {
    if (editProductRef.current) {
      editProductRef.current.saveChanges();
    }
    handleClose();
  };

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
    </>
  );
};

export default ProductManager;
