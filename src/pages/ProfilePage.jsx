import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CartIcon, HeartIcon, LogoutIcon } from "../components/Icons";
import OrderCard from "../components/OrderCard";
import { useStore } from "../context/storeContext";
import { getInitials } from "../utils/format";

function ProfilePage() {
  const navigate = useNavigate();
  const {
    currentUser,
    orders,
    wishlistCount,
    cartTotalCount,
    updateProfile,
    setOnlyWishlist,
    logout,
  } = useStore();

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    return (
      <section className="auth-page-wrapper">
        <div className="auth-card">
          <div className="auth-card-top">
            <span className="auth-badge">Profil</span>
            <Link to="/" className="auth-back-btn">
              <ArrowLeftIcon />
              <span>Do‘konga qaytish</span>
            </Link>
          </div>
          <h3 className="auth-title">Hisobga kiring</h3>
          <p className="auth-desc">
            Profil ma’lumotlari va buyurtmalaringizni ko‘rish uchun tizimga kiring.
          </p>
          <Link to="/login" className="auth-submit-btn auth-submit-link">
            Kirish sahifasiga o‘tish
          </Link>
        </div>
      </section>
    );
  }

  const userOrders = orders.filter(
    (order) =>
      order.email?.toLowerCase() === currentUser.email.toLowerCase() ||
      order.customer.toLowerCase() === currentUser.fullName.toLowerCase()
  );

  function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const result = updateProfile({ fullName, phone });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  function handleGoWishlist() {
    setOnlyWishlist(true);
    navigate("/");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <section className="profile-page-section" aria-label="Foydalanuvchi profili">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">Profilim</span>
          <h2 className="cart-page-title">{currentUser.fullName}</h2>
          <p className="cart-page-subtitle">{currentUser.email}</p>
        </div>

        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </Link>
      </div>

      <div className="auth-grid">
        <div className="auth-card">
          <div className="profile-menu-head" style={{ padding: "0 0 16px", marginBottom: "18px" }}>
            <span className="profile-avatar-lg">{getInitials(currentUser.fullName)}</span>
            <div className="profile-user-info">
              <p className="profile-user-name">{currentUser.fullName}</p>
              <p className="profile-user-email">{currentUser.email}</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSave}>
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="profile-name">
                To‘liq ism
              </label>
              <input
                id="profile-name"
                type="text"
                className="auth-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="profile-phone">
                Telefon raqam
              </label>
              <input
                id="profile-phone"
                type="tel"
                className="auth-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {error && <p className="form-error">{error}</p>}
            {saved && <p className="promo-status">Ma’lumotlar muvaffaqiyatli yangilandi</p>}

            <button type="submit" className="auth-submit-btn">
              O‘zgarishlarni saqlash
            </button>
          </form>

          <div className="profile-quick-actions">
            <button type="button" className="header-pill" onClick={handleGoWishlist}>
              <HeartIcon filled />
              <span>Sevimlilar</span>
              <span className="pill-count">{wishlistCount}</span>
            </button>

            <Link to="/cart" className="header-pill header-pill--dark">
              <CartIcon />
              <span>Savat</span>
              <span className="pill-count">{cartTotalCount}</span>
            </Link>

            <button
              type="button"
              className="header-pill header-pill--danger"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        <div className="auth-card">
          <h3 className="auth-title">Mening buyurtmalarim ({userOrders.length})</h3>
          <p className="auth-desc">Siz rasmiylashtirgan buyurtmalar tarixi</p>

          {userOrders.length === 0 ? (
            <p className="empty-state-desc">Hali buyurtmalar mavjud emas.</p>
          ) : (
            <div className="profile-orders-list">
              {userOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
