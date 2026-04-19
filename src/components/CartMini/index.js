import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Cài thêm: npm i @ant-design/icons
import { Badge } from "antd";

function CartMini() {
  const cart = useSelector(state => state.cartReducer);

  const total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <Link to="/cart" >
      <Badge count={total} showZero size="small">
        <ShoppingCartOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
        <span>Giỏ hàng</span>
      </Badge>
    </Link>
  );
}

export default CartMini;