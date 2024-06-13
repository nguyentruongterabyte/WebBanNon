import { useState, useEffect, useReducer, useRef, forwardRef, useImperativeHandle } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import productReducer, { initialState, ACTION_TYPE } from '../../reducer/productReducer';
import Image from 'react-bootstrap/Image';
import images from '../../assets/images';
import { Row, Col } from 'react-bootstrap';
import './EditProduct.css';
import { toast } from 'react-toastify';
import hooks from '~/hooks';
import config from '~/config';

// eslint-disable-next-line react/display-name
const EditProduct = forwardRef(({ maSanPham = '-1', isCreate = false }, ref) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const { tenSanPham, giaSanPham, soLuong, gioiTinh, mauSac, hinhAnh, moTa } = state;

  const [product, setProduct] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { get, uploadImage, create, update } = hooks.useProductApiCalls();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (maSanPham != -1 && !isCreate) {
      const fetchData = async () => {
        const data = await get(maSanPham);
        if (data.status == 200) {
          setProduct(data.result);
        }
      };

      fetchData();
    }
  }, [maSanPham, isCreate, get]);

  useEffect(() => {
    if (product) {
      dispatch({ type: ACTION_TYPE.SET_TEN, payload: product.tenSanPham });
      dispatch({ type: ACTION_TYPE.SET_GIA, payload: product.giaSanPham });
      dispatch({ type: ACTION_TYPE.SET_HINH_ANH, payload: product.hinhAnh });
      dispatch({ type: ACTION_TYPE.SET_MAU_SAC, payload: product.mauSac });
      dispatch({ type: ACTION_TYPE.SET_SO_LUONG, payload: product.soLuong });
      dispatch({ type: ACTION_TYPE.SET_TRANG_THAI, payload: product.trangThai });
      dispatch({ type: ACTION_TYPE.SET_GIOI_TINH, payload: product.gioiTinh });
      dispatch({ type: ACTION_TYPE.SET_MO_TA, payload: product.moTa });
    }
  }, [product]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      dispatch({ type: ACTION_TYPE.SET_HINH_ANH, payload: file.name });
      setSelectedFile(file);
    }
  };

  const getDownloadURL = async (selectedFile, productId) => {
    const data = await uploadImage(selectedFile, productId);

    if (data.status === 200) {
      return data.result;
    } else {
      return null;
    }
  };

  const saveChanges = async () => {
    // Upload hình ảnh
    let hinhAnhURL = hinhAnh;
    if (selectedFile) {
      hinhAnhURL = await toast.promise(getDownloadURL(selectedFile, maSanPham), {
        pending: 'Đang tải hình ảnh sản phẩm lên',
      });
      dispatch({ type: ACTION_TYPE.SET_HINH_ANH, payload: hinhAnhURL ?? config.constants.DEFAULT_IMAGE_TEMPLATE_URL });
    }

    // update sản phẩm
    const formData = {
      maSanPham: maSanPham,
      tenSanPham: tenSanPham,
      giaSanPham: giaSanPham,
      soLuong: soLuong,
      gioiTinh: gioiTinh,
      mauSac: mauSac,
      hinhAnh: hinhAnhURL,
      moTa: moTa,
    };
    if (isCreate) {
      const response = await create(formData);

      if (response.status == 200) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await update(formData);
      if (response.status == 200) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    saveChanges: saveChanges,
  }));

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.ControlInput1">
        <Form.Label>Tên sản phẩm</Form.Label>
        <Form.Control
          value={tenSanPham ?? ''}
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_TEN, payload: e.target.value })}
          type="text"
          placeholder="Mũ lưỡi trai"
          required
          autoFocus
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Giá sản phẩm</Form.Label>
        <Form.Control
          value={giaSanPham ?? ''}
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_GIA, payload: e.target.value })}
          type="number"
          placeholder="100000"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Số lượng</Form.Label>
        <Form.Control
          required
          value={soLuong ?? ''}
          type="number"
          placeholder="5"
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_SO_LUONG, payload: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Màu sắc</Form.Label>
        <Form.Control
          required
          value={mauSac ?? ''}
          type="text"
          placeholder="Nâu sẫm"
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_MAU_SAC, payload: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Giới tính</Form.Label>
        <Form.Select
          value={gioiTinh ?? ''}
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_GIOI_TINH, payload: e.target.value })}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Unisex">Unisex</option>
        </Form.Select>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="form.ControlInput1">
        <Form.Label>Hình ảnh</Form.Label>
        <Col sm="12">
          <Row>
            <Col sm="10">
              <Form.Control
                required
                value={hinhAnh ?? ''}
                readOnly
                onChange={(e) => dispatch({ type: ACTION_TYPE.SET_HINH_ANH, payload: e.target.value })}
                type="text"
              />
              <input accept="image/*" ref={fileInputRef} onChange={handleFileChange} type="file" hidden />
            </Col>
            <Col sm="2">
              <Image
                onClick={handleImageClick}
                className="product-edit__image-icon"
                src={images.pictureIcon}
                fluid
                width={45}
                height={100}
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Label>Mô tả sản phẩm</Form.Label>
        <Form.Control
          value={moTa}
          onChange={(e) => dispatch({ type: ACTION_TYPE.SET_MO_TA, payload: e.target.value })}
          as="textarea"
          rows={5}
        />
      </Form.Group>
    </Form>
  );
});

EditProduct.propTypes = {
  maSanPham: PropTypes.any,
  isCreate: PropTypes.bool,
};

export default EditProduct;
