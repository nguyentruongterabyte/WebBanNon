export const initialState = {
  tenSanPham: '',
  giaSanPham: '',
  soLuong: 0,
  gioiTinh: 'Nam',
  mauSac: '',
  hinhAnh: '',
  trangThai: '',
  moTa: '',
};

export const ACTION_TYPE = {
  SET_TEN: 'SET_TEN',
  SET_GIA: 'SET_GIA',
  SET_SO_LUONG: 'SET_SO_LUONG',
  SET_GIOI_TINH: 'SET_GIOI_TINH',
  SET_MAU_SAC: 'SET_MAU_SAC',
  SET_HINH_ANH: 'SET_HINH_ANH',
  SET_TRANG_THAI: 'SET_TRANG_THAI',
  SET_MO_TA: 'SET_MO_TA',
};

const productReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_TEN:
      return { ...state, tenSanPham: action.payload };
    case ACTION_TYPE.SET_GIA:
      return { ...state, giaSanPham: action.payload };
    case ACTION_TYPE.SET_SO_LUONG:
      return { ...state, soLuong: action.payload };
    case ACTION_TYPE.SET_GIOI_TINH:
      return { ...state, gioiTinh: action.payload };
    case ACTION_TYPE.SET_MAU_SAC:
      return { ...state, mauSac: action.payload };
    case ACTION_TYPE.SET_HINH_ANH:
      return { ...state, hinhAnh: action.payload };
    case ACTION_TYPE.SET_TRANG_THAI:
      return { ...state, trangThai: action.payload };
    case ACTION_TYPE.SET_MO_TA:
      return { ...state, moTa: action.payload };
    default:
      return state;
  }
};

export default productReducer;
