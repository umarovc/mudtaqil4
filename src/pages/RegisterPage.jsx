import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../components/Icons";
import { useStore } from "../context/storeContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = register({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/");
  }

  return (
    <section className="auth-page-wrapper auth-page-wrapper--wide" aria-label="Ro'yxatdan o'tish sahifasi">
      <div className="auth-card">
        <div className="auth-card-top">
          <span className="auth-badge">Ro‘yxatdan o‘tish</span>
          <Link to="/" className="auth-back-btn">
            <ArrowLeftIcon />
            <span>Do‘konga qaytish</span>
          </Link>
        </div>

        <h3 className="auth-title">Yangi hisob yaratish</h3>
        <p className="auth-desc">
          Tezkor buyurtma berish va sevimlilarni saqlash uchun ro‘yxatdan o‘ting.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-name">
              To‘liq ism
            </label>
            <input
              id="register-name"
              type="text"
              className="auth-input"
              placeholder="Azizbek Karimov"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="auth-row-2">
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="register-email">
                Elektron pochta
              </label>
              <input
                id="register-email"
                type="email"
                className="auth-input"
                placeholder="azizbek@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="register-phone">
                Telefon raqam
              </label>
              <input
                id="register-phone"
                type="tel"
                className="auth-input"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
          </div>

          <div className="auth-row-2">
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="register-password">
                Parol
              </label>
              <input
                id="register-password"
                type="password"
                className="auth-input"
                placeholder="Kamida 6 ta belgi"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="register-confirm">
                Parolni tasdiqlang
              </label>
              <input
                id="register-confirm"
                type="password"
                className="auth-input"
                placeholder="Parolni qayta kiriting"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="auth-submit-btn">
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="auth-switch">
          Allaqachon hisobingiz bormi?{" "}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => navigate("/login")}
          >
            Kirish
          </button>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
