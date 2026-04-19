import { useDispatch, useSelector } from "react-redux";
import { Tag, Image, Rate, Tooltip, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart, updateQuantity } from "../../actions/cart";

function ProductItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer);

  const priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(1);

  const handleAddToCart = () => {
    if (cart.some(itemCart => itemCart.id === item.id)) {
      dispatch(updateQuantity(item.id));
    } else {
      dispatch(addToCart(item.id, item));
    }

    message.success(`Đã thêm ${item.title} vào giỏ hàng!`);
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <Image src={item.thumbnail} alt={item.title} preview={false} />
        <Tag color="red" className="product-card__badge">
          -{item.discountPercentage}%
        </Tag>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{item.title}</h3>
        
        <Rate disabled defaultValue={item.rating || 5} style={{ fontSize: '12px' }} />

        <div className="product-card__price">
          <span className="price-new">{priceNew}$</span>
          <span className="price-old">{item.price}$</span>
        </div>

        <Tooltip title="Thêm sản phẩm này vào giỏ hàng của bạn"> 
          <button className="btn-add-cart" onClick={handleAddToCart}>
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductItem;