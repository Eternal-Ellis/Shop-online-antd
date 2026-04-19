import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Image, Input, Modal, message, Form, Badge } from "antd";
import { deleteAll, deleteItem, updateQuantity } from "../../actions/cart";
import "./Cart.scss";

function Cart() {
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const getPriceNew = (item) => {
    return (item.info.price * (100 - item.info.discountPercentage) / 100);
  };

  const total = cart.reduce((sum, item) => sum + getPriceNew(item) * item.quantity, 0);

  const confirmDeleteAll = () => {
    Modal.confirm({
      title: 'Xác nhận xóa sạch giỏ hàng?',
      content: 'Hành động này không thể hoàn tác.',
      onOk: () => {
        dispatch(deleteAll());
        message.success('Đã xóa tất cả sản phẩm!'); 
      },
    });
  };

  const columns = [
    {
      title: 'Sản phẩm',
      key: 'product',
      render: (_, item) => (
        <div className="product-cell">
          <Image width={80} src={item.info.thumbnail} /> 
          <div className="product-info">
            <div className="product-name">{item.info.title}</div>
            <Tag color="blue">Giảm {item.info.discountPercentage}%</Tag>
          </div>
        </div>
      )
    },
    {
      title: 'Giá tiền',
      key: 'price',
      render: (_, item) => (
        <div className="price-cell">
          <div className="price-new">{getPriceNew(item).toFixed(2)}$</div>
          <div className="price-old">{item.info.price}$</div>
        </div>
      )
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      render: (_, item) => (
        <div className="quantity-controls">
          <button className="btn-qty" onClick={() => item.quantity > 1 && dispatch(updateQuantity(item.id, -1))}>-</button>
          <Input value={item.quantity} readOnly className="input-qty" /> {/* Sử dụng Input (Ảnh 2) */}
          <button className="btn-qty" onClick={() => dispatch(updateQuantity(item.id))}>+</button>
        </div>
      )
    },
    {
      title: 'Tổng',
      key: 'subtotal',
      render: (_, item) => <strong>{(getPriceNew(item) * item.quantity).toFixed(2)}$</strong>
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, item) => (
        <button className="btn-delete" onClick={() => dispatch(deleteItem(item.id))}>Xóa</button>
      )
    }
  ];

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>
          <Badge count={cart.length} offset={[10, 0]}>Giỏ hàng</Badge> 
        </h2>
        {cart.length > 0 && (
          <button className="btn-clear" onClick={confirmDeleteAll}>Xóa tất cả</button>
        )}
      </div>

      {cart.length > 0 ? (
        <>
          <Table 
            dataSource={cart} 
            columns={columns} 
            rowKey="id" 
            pagination={false} 
            className="cart-table"
          />
          
          <div className="cart-footer">
            <div className="cart-total-final">
              Tổng tiền thanh toán: <span>{total.toFixed(2)}$</span>
            </div>

            <div className="checkout-form">
              <h3>Thông tin đặt hàng</h3>
              <Form layout="vertical" onFinish={(vals) => message.success('Đơn hàng đang được xử lý!')}>
                <Form.Item label="Họ tên" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                  <Input placeholder="Tên người nhận" />
                </Form.Item>
                <Form.Item label="Địa chỉ nhận hàng" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                  <Input.TextArea placeholder="Số nhà, tên đường..." />
                </Form.Item>
                <button type="submit" className="btn-submit">XÁC NHẬN ĐƠN HÀNG</button>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">Giỏ hàng của bạn đang trống.</div>
      )}
    </div>
  );
}

export default Cart;