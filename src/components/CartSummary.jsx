import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/storeContext";
import { formatPrice } from "../utils/format";

function CartSummary() {
  const navigate = useNavigate();
  const {
    currentUser,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    deliveryMethod,
    setDeliveryMethod,
    itemsSubtotal,
    discountAmount,
    deliveryFee,
    finalTotal,
    placeOrder,
  } = useStore();

  const [promoInput, setPromoInput] = useState(appliedPromo?.code || "");
  const [promoError, setPromoError] = useState("");
  const [customerName, setCustomerName] = useState(currentUser?.fullName || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [checkoutError, setCheckoutError] = useState("");

  function handlePromoSubmit(e) {
    e.preventDefault();
    setPromoError("");
    const result = applyPromoCode(promoInput);
    if (!result.ok) {
      setPromoError(result.error);
    }
  }

  function handleRemovePromo() {
    removePromoCode();
    setPromoInput("");
    setPromoError("");
  }

  function handleCheckout(e) {
    e.preventDefault();
    setCheckoutError("");
    const result = placeOrder({ customerName, phone });
    if (!result.ok) {
      setCheckoutError(result.error);
      return;
    }

    navigate("/");
    setTimeout(() => {
      document
        .getElementById("orders-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  return (
    <aside className="cart-summary-card">
      <h3 className="cart-summary-title">Buyurtmani rasmiylashtirish</h3>

      <form className="promo-section" onSubmit={handlePromoSubmit}>
        <div className="promo-row">
          <input
            type="text"
            className="promo-input"
            placeholder="Promo kod (masalan: SALE10)"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value);
              if (promoError) setPromoError("");
            }}
          />
          {appliedPromo ? (
            <button
              type="button"
              className="btn-promo btn-promo--clear"
              onClick={handleRemovePromo}
            >
              Bekor qilish
            </button>
          ) : (
            <button type="submit" className="btn-promo">
              Qo‘llash
            </button>
          )}
        </div>

        {appliedPromo && (
          <p className="promo-status">
            {appliedPromo.code} qo‘llandi — {appliedPromo.percent}% chegirma
          </p>
        )}
        {promoError && <p className="form-error">{promoError}</p>}
      </form>

      <form onSubmit={handleCheckout}>
        <div className="checkout-form">
          <p className="checkout-heading">Buyurtma ma’lumotlari</p>

          <input
            type="text"
            className="form-field"
            placeholder="Ismingiz"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              if (checkoutError) setCheckoutError("");
            }}
          />

          <input
            type="tel"
            className="form-field"
            placeholder="+998 90 123 45 67"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (checkoutError) setCheckoutError("");
            }}
          />

          <div className="delivery-options">
            <button
              type="button"
              className={`delivery-chip ${deliveryMethod === "courier" ? "active" : ""}`}
              onClick={() => setDeliveryMethod("courier")}
            >
              Kuryer orqali
              <span>30 000 so&apos;m</span>
            </button>
            <button
              type="button"
              className={`delivery-chip ${deliveryMethod === "pickup" ? "active" : ""}`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              Olib ketish
              <span>Bepul</span>
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Mahsulotlar</span>
            <span>{formatPrice(itemsSubtotal)}</span>
          </div>

          {discountAmount > 0 && appliedPromo && (
            <div className="summary-row summary-row--discount">
              <span>Chegirma ({appliedPromo.percent}%)</span>
              <span>− {formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Yetkazib berish</span>
            <span>{deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}</span>
          </div>

          <div className="summary-total">
            <span>Jami summa</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {checkoutError && (
          <p className="form-error" style={{ marginBottom: "10px" }}>
            {checkoutError}
          </p>
        )}

        <button type="submit" className="btn-checkout">
          Buyurtma berish
        </button>
      </form>
    </aside>
  );
}

export default CartSummary;
