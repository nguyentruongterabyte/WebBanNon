import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductItem from '../../components/ProductItem';
import productApiCalls from '../../networking/productApiCalls';


const ProductList = () => {
  const [currentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(20);
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await productApiCalls.getPage(1, itemsPerPage);
      if (data.status === 200) {
        setProducts(data.result);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  const chunk = (arr, size) => {
    if (!arr || arr.length === 0) {
      return [];
    }
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

 

  return (
    <Container>
      {chunk(products, 4).map((rowProducts, index) => (
        <Row key={index}>
          {rowProducts.map((product) => (
            <Col key={product.maSanPham} sm={6} md={4} lg={3}>
              <ProductItem isUser={true} data={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default ProductList;