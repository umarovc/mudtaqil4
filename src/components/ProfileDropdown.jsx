import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/storeContext";
import { getInitials, getShortName } from "../utils/format";
import { BagIcon, ChevronDownIcon, HeartIcon, LogoutIcon, UserIcon } from "./Icons";

function ProfileDropdown() {
  const detailsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, orders, wishlistCount, setOnlyWishlist, logout } = useStore();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        detailsRef.current.open = false;
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (!currentUser) return null;

  const initials = getInitials(currentUser.fullName);
  const shortName = getShortName(currentUser.fullName);

  function closeMenu() {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }

  function handleProfileClick() {
    closeMenu();
    navigate("/profile");
  }

  function handleOrdersClick() {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/#orders-section");
      setTimeout(() => {
        document
          .getElementById("orders-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document
        .getElementById("orders-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleWishlistClick() {
    closeMenu();
    setOnlyWishlist(true);
    navigate("/");
  }

  function handleLogoutClick() {
    closeMenu();
    logout();
    navigate("/");
  }

  return (
    <details className="profile-dropdown" ref={detailsRef}>
      <summary className="profile-trigger">
        <span className="profile-avatar-sm">{initials}</span>
        <span className="profile-trigger-name">{shortName}</span>
        <span className="profile-trigger-chevron">
          <ChevronDownIcon />
        </span>
      </summary>

      <div className="profile-menu">
        <div className="profile-menu-head">
          <span className="profile-avatar-lg">{initials}</span>
          <div className="profile-user-info">
            <p className="profile-user-name">{currentUser.fullName}</p>
            <p className="profile-user-email">{currentUser.email}</p>
          </div>
        </div>

        <div className="profile-menu-list">
          <button
            type="button"
            className={`profile-menu-item ${location.pathname === "/profile" ? "is-active" : ""}`}
            onClick={handleProfileClick}
          >
            <span className="profile-menu-left">
              <UserIcon />
              <span>Profilim</span>
            </span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={handleOrdersClick}
          >
            <span className="profile-menu-left">
              <BagIcon />
              <span>Buyurtmalarim</span>
            </span>
            <span className="profile-menu-badge">{orders.length}</span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={handleWishlistClick}
          >
            <span className="profile-menu-left">
              <HeartIcon />
              <span>Sevimlilarim</span>
            </span>
            <span className="profile-menu-badge">{wishlistCount}</span>
          </button>
        </div>

        <div className="profile-menu-footer">
          <button
            type="button"
            className="profile-menu-item is-danger"
            onClick={handleLogoutClick}
          >
            <span className="profile-menu-left">
              <LogoutIcon />
              <span>Chiqish</span>
            </span>
          </button>
        </div>
      </div>
    </details>
  );
}

export default ProfileDropdown;
