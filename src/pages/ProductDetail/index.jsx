import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import hooks from '~/hooks';
import Loading from '~/components/Loading';
import { Button, Image } from 'react-bootstrap';
import './ProductDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '~/assets/icons';
import { toast } from 'react-toastify';
import { ROLES } from '~/config/constants';
import Utils from '~/utils/Utils';

const ProductDetail = () => {
  const { role } = hooks.useJWTDecode();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { get } = hooks.useProductApiCalls();
  const { createCart } = hooks.useCartApiCalls();
  const { user } = hooks.useJWTDecode();
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await get(id);
      if (data.status === 200) {
        setProduct(data.result);
      }
    };
    fetchProduct();
  }, [id, get]);

  if (!product) {
    return <Loading />;
  }

  const handleAddClick = async (e) => {
    e.preventDefault();
    const formData = {
      soLuong: 1,
      userId: user,
      maSanPham: product.maSanPham,
    };
    const data = await createCart(formData);
    if (data.status === 200) {
      toast.success(data.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>{product.tenSanPham}</h1>
          <Image rounded src={product.hinhAnh} alt={product.tenSanPham} />
          <p>Màu sắc: {product.mauSac}</p>
          <p>Giới tính: {product.gioiTinh}</p>
          <p>Giá: {Utils.formatCurrency(Number(product.giaSanPham))}</p>
          <p>Mô tả: {product.moTa}</p>
        </Col>
        {role === ROLES.user ? (
          <Button size="lg" variant="success" className="cart__btn-add" onClick={handleAddClick}>
            <FontAwesomeIcon icon={icons.faCartArrowDown} />
          </Button>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetail;
