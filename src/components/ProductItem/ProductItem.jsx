import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'
import './ProductItem.css';



export const ProductItem = ({data}) => {
   return (
     <Card className="product-item__container">
       <Card.Img className="product-item__img" variant="top" src={data.hinhAnh}/>
       <Card.Body>
         <Card.Title>{data.tenSanPham}</Card.Title>
         <Card.Text>
           - Màu sắc: {data.mauSac}
           <br />- Giới tính: { data.gioiTinh }
           <br />- Giá: {data.giaSanPham}
         </Card.Text>
         <Button variant="primary">Chỉnh sửa</Button>
       </Card.Body>
     </Card>
   );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default ProductItem;
