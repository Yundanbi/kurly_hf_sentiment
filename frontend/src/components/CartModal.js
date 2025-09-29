import React, { useState } from "react";
import "./CartModal.css";

function CartModal({ product, onClose, onAdd }) {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAdd(product, qty);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <img
            src={process.env.PUBLIC_URL + `/${product.thumbnail}`}
            alt={product.name}
            width="50"
            height="50"
          />
          <p className="modal-title">{product.name}</p>
        </div>

        <p className="product-subtitle">{product.name}</p>

        <div className="price-qty-row">
          <div>
            <strong className="price-discount">
              {product.product_choice.discount_price}
            </strong>
            <del className="price-original">{product.price.original}</del>
          </div>
          <div className="qty-control">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>

        <hr className="modal-divider" />

        <div className="total-section">
          <span>합계</span>
          <span className="total-price">
            {(
              parseInt(
                product.product_choice.discount_price.replace(/,/g, "")
              ) * qty
            ).toLocaleString()}
            원
          </span>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
          <button className="add-btn" onClick={handleAdd}>
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
