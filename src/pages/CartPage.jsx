import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { ArrowLeftIcon, CartIcon } from "../components/Icons";
import { useStore } from "../context/storeContext";

function CartPage() {
  const { cartItems, cartTotalCount, clearCart } = useStore();

  return (
    <section className="cart-page-section cart-page-section--standalone" aria-label="Savat sahifasi">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">Savat</span>
          <h2 className="cart-page-title">Savatingiz</h2>
          <p className="cart-page-subtitle">
            {cartTotalCount > 0
              ? `${cartTotalCount} ta mahsulot tanlangan — buyurtmani rasmiylashtiring`
              : "Savatingiz hozircha bo‘sh"}
          </p>
        </div>

        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <CartIcon />
          </div>
          <h3 className="empty-state-title">Savatingiz bo‘sh</h3>
          <p className="empty-state-desc">
            Xaridni boshlash uchun katalogdan o‘zingizga yoqqan mahsulotlarni savatga qo‘shing.
          </p>
          <Link to="/" className="empty-state-btn empty-state-link">
            Do‘konga o‘tish
          </Link>
        </div>
      ) : (
        <div className="cart-page-grid">
          <div className="cart-items-card">
            <div className="cart-header">
              <h3 className="cart-title">
                <CartIcon />
                <span>Tanlangan mahsulotlar ({cartTotalCount})</span>
              </h3>
              <button type="button" className="btn-clear" onClick={clearCart}>
                Savatni tozalash
              </button>
            </div>

            <ul className="cart-page-list">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <CartSummary />
        </div>
      )}
    </section>
  );
}

export default CartPage;
