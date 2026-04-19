import { Link, Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import CartMini from "../../components/CartMini";
import "./LayoutDefault.scss";

const { Header, Content, Footer } = Layout;

function LayoutDefault() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="layout-default">
      <Header className="layout-default__header">
        <div className="layout-default__logo">
          <Link to="/">Trang chủ</Link>
        </div>

        <div className="layout-default__cart">
          <CartMini />
        </div>
      </Header>

      <Content className="layout-default__content">
        <div
          className="layout-default__inner"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer className="layout-default__footer">
        Một sản phẩm của Phạm Quốc Huy ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default LayoutDefault;