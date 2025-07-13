/**
 * Tạo mã xác thực ngẫu nhiên gồm 6 chữ số
 * @returns {string}
 */
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = generateCode;
