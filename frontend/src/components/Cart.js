import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, changeQuantity } from "../store/cartSlice";
import Header from "./Header";
import "./Cart.css";
import Footer from "./Footer";
function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleChange = (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      dispatch(changeQuantity({ id, quantity: newQty }));
    }
  };

  const deliveryFee = 3000;
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(
      item.product_choice.discount_price.replace(/,/g, "")
    );
    return sum + price * item.quantity;
  }, 0);
  const finalAmount = totalPrice + deliveryFee;

  return (
    <>
      <div className="cart-wrapper">
        <h2 className="cart-title">장바구니</h2>
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="empty">장바구니가 비어 있습니다.</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-info">
                    <img
                      src={process.env.PUBLIC_URL + `/${item.thumbnail}`}
                      alt={item.name}
                      className="item-thumbnail"
                    />
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">
                        <strong>{item.product_choice.discount_price}</strong>
                        <del className="original">
                          {item.product_choice.original}
                        </del>
                      </p>
                      <div className="quantity-control">
                        <button onClick={() => handleChange(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleChange(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <h3>결제금액</h3>
            <div className="summary-line">
              <span>총 상품금액</span>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </div>
            <div className="summary-line">
              <span>배송비</span>
              <strong>3000원</strong>
            </div>
            <div className="summary-total">
              <span>결제예정금액</span>
              <strong>{finalAmount.toLocaleString()}원</strong>
            </div>
            <button className="checkout-btn">주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
