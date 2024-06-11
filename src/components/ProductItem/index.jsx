import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductItem.css';
import hooks from '~/hooks';
import Utils from '~/utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '~/assets/icons';

export const ProductItem = ({ data, isUser = false, onClickButtonEdit }) => {
  const navigate = useNavigate();
  const { user } = hooks.useJWTDecode();
  const { createCart } = hooks.useCartApiCalls();
  const { deleteProduct} = hooks.useProductApiCalls();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/product/${data.maSanPham}`);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickButtonEdit();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isConfirm = confirm('Bạn có muốn xóa sản phẩm này?');
    if (isConfirm) {
      handleConfirmDelete();
    }
  };

  const handleConfirmDelete = async () => {
    const data2 = await deleteProduct(data.maSanPham);
    if (data2.status === 200) {
      toast.success(data2.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      window.location.reload();
    } else {
      toast.error(`${data2.status} ${data2.message}`, {
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

  // add cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    // Logic to add the product to the cart
    // For example, you can store the product in local storage or update the state in a global context
    // const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // cart.push(data);
    // localStorage.setItem('cart', JSON.stringify(cart));
    const formData = {
      soLuong: 1,
      userId: user,
      maSanPham: data.maSanPham,
    };
    const d = await createCart(formData);

    if (d.status === 200) {
      toast.success(d.message);
    }
  };

  return (
    <Card className="product-item__container" onClick={handleClick}>
      <Card.Img className="product-item__img" variant="top" src={data.hinhAnh} />
      <Card.Body>
        <Card.Title className="product-item__name">{data.tenSanPham}</Card.Title>
        <Card.Text className="product-item__describe">
          <span>{Utils.formatCurrency(Number(data.giaSanPham))}</span>
        </Card.Text>

        {!isUser && (
          <>
            <Button variant="primary" onClick={handleEditClick}>
              Chỉnh sửa
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              Xóa
            </Button>
          </>
        )}

        {isUser && (
          <Button variant="success" size="lg" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={icons.faCartArrowDown} />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClickButtonEdit: PropTypes.func,
  onClickButtonDelete: PropTypes.func,
  isUser: PropTypes.bool,
};

export default ProductItem;
