const Utils = {
  formatCurrency: (value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export default Utils;