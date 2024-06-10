import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApiCalls from '../../networking/productApiCalls';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await productApiCalls.get(id);
      if (data.status === 200) {
        setProduct(data.result);
      }
    };
    fetchProduct();
  }, [id]); // Add id to dependency array

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{product.tenSanPham}</h1>
          <img src={product.hinhAnh} alt={product.tenSanPham} />
          <p>Màu sắc: {product.mauSac}</p>
          <p>Giới tính: {product.gioiTinh}</p>
          <p>Giá: {product.giaSanPham}</p>
          <p>Mô tả: {product.moTa}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
