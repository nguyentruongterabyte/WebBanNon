import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'
import './ProductItem.css';
import { BASE_URL, BASE_IMAGE_URL, BASE_PRODUCT_URL } from '../../utils/utils';

export const ProductItem = ({data, onClickButtonEdit}) => {
   return (
     <Card className="product-item__container">
       <Card.Img className="product-item__img" variant="top" src={data.hinhAnh.indexOf("http") !== -1 ? data.hinhAnh : BASE_URL + BASE_IMAGE_URL + BASE_PRODUCT_URL + data.hinhAnh}/>
       <Card.Body>
         <Card.Title className='product-item__name'>{data.tenSanPham}</Card.Title>
         <Card.Text>
           - Màu sắc: {data.mauSac}
           <br />- Giới tính: { data.gioiTinh }
           <br />- Giá: {data.giaSanPham}
         </Card.Text>
         <Button variant="primary" onClick={onClickButtonEdit}>Chỉnh sửa</Button>
       </Card.Body>
     </Card>
   );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClickButtonEdit: PropTypes.func
}

export default ProductItem;
