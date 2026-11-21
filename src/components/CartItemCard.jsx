import { useStore } from "../context/storeContext";
import { DeviceIcon, TrashIcon } from "./Icons";

function CartItemCard({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useStore();
  const isMaxQty = item.quantity >= item.stock;

  return (
    <li className="cart-page-item">
      <div className="cart-item-thumb">
        <DeviceIcon type={item.icon} />
      </div>

      <div className="cart-page-item-info">
        <span className="product-category">{item.category}</span>
        <p className="cart-page-item-name">{item.name}</p>
        <p className="cart-page-item-specs">{item.specs}</p>
        <p className="cart-page-item-unit">
          1 dona narxi: {item.unitPrice} • Omborda: {item.stock} ta
        </p>
      </div>

      <div className="cart-page-item-controls">
        <div className="qty-stepper">
          <button
            type="button"
            className="qty-btn"
            aria-label="Miqdorni kamaytirish"
            onClick={() => decreaseQty(item.id)}
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            aria-label="Miqdorni oshirish"
            disabled={isMaxQty}
            onClick={() => increaseQty(item.id)}
          >
            +
          </button>
        </div>

        <span className="cart-page-item-subtotal">{item.subtotal}</span>

        <button
          type="button"
          className="btn-remove-item"
          aria-label="O'chirish"
          onClick={() => removeFromCart(item.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default CartItemCard;
