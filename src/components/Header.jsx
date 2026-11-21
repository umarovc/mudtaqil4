import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/storeContext";
import { CartIcon, CloseIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    setSearchQuery,
    wishlistCount,
    onlyWishlist,
    setOnlyWishlist,
    cartTotalCount,
    currentUser,
  } = useStore();

  function handleBrandClick() {
    setOnlyWishlist(false);
    navigate("/");
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchQuery(value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  function handleWishlistClick() {
    if (location.pathname !== "/") {
      setOnlyWishlist(true);
      navigate("/");
    } else {
      setOnlyWishlist((prev) => !prev);
    }
  }

  function handleCartClick() {
    navigate("/cart");
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button type="button" className="brand brand-button" onClick={handleBrandClick}>
          <div className="brand-mark">TB</div>
          <div>
            <p className="brand-title">TexnoBozor</p>
            <p className="brand-subtitle">Zamonaviy texnika do‘koni</p>
          </div>
        </button>

        <div className="header-search">
          <span className="header-search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="header-search-input"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              type="button"
              className="header-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Qidiruvni tozalash"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="header-actions">
          <button
            type="button"
            className={`header-pill ${onlyWishlist && location.pathname === "/" ? "header-pill--active" : ""}`}
            onClick={handleWishlistClick}
          >
            <HeartIcon filled={onlyWishlist || wishlistCount > 0} />
            <span>Sevimlilar</span>
            <span className="pill-count">{wishlistCount}</span>
          </button>

          <button
            type="button"
            className="header-pill header-pill--dark"
            onClick={handleCartClick}
          >
            <CartIcon />
            <span>Savat</span>
            <span className="pill-count">{cartTotalCount}</span>
          </button>

          <div className="header-divider" aria-hidden="true" />

          {currentUser ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link to="/login" className="header-pill">
                <UserIcon />
                <span>Kirish</span>
              </Link>

              <Link to="/register" className="header-pill header-pill--brand">
                <span>Ro‘yxatdan o‘tish</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
