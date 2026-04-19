import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import { getProductList } from "../../service/ProductService";
import ProductItem from "./ProductItem";
import "./Product.scss";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const result = await getProductList();
      setProducts(result);
      setLoading(false);
    };
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Danh sách sản phẩm</h2>
      
      <Spin spinning={loading} tip="Đang tải sản phẩm...">
        <Row gutter={[20, 20]}>
          {products.map(item => (
            <Col xxl={6} xl={8} lg={8} md={12} sm={24} xs={24} key={item.id}>
              <ProductItem item={item} />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}

export default Product;