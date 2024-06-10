import './Home.css'; // Import file CSS để thiết lập kiểu cho component Home
const Home = () => {
  return (
    <div className="main-container">
      <div className="title-container">
        <img
          src="https://top10vietnam.vn/wp-content/uploads/2020/07/cua-hang-mu-non-son.jpg"
          alt="Cửa hàng mũ nón Sơn"
          className="full-screen-image"
        />
      </div>
      <footer className="footer">
        <div className="footer-content">
          <img
            src="https://bizweb.dktcdn.net/100/479/837/products/mu-luoi-trai-mlb-n-cover-logo-chu-b-mau-vang-1-1687347237798.png"
            alt="avatar mũ nón Sơn"
          />
          <h1>App bán nón</h1>
          <div className="about-us">
            <h1>About Us</h1>
            <p>
              Một trang web bán nón là nền tảng trực tuyến để mua các loại nón <br /> khác nhau, từ nón thể thao đến nón
              bảo hiểm và phụ kiện liên quan.
            </p>
          </div>
          <div className="follow-us">
            <h1>Follow Us</h1>
            <img
              src="https://cdn.pixabay.com/photo/2020/06/30/14/37/facebook-5356593_1280.png"
              alt="Social Media Icon"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
