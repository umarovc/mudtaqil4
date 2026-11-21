import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../components/Icons";
import { useStore } from "../context/storeContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const result = login({ email, password, remember });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/");
  }

  return (
    <section className="auth-page-wrapper" aria-label="Kirish sahifasi">
      <div className="auth-card">
        <div className="auth-card-top">
          <span className="auth-badge">Kirish</span>
          <Link to="/" className="auth-back-btn">
            <ArrowLeftIcon />
            <span>Do‘konga qaytish</span>
          </Link>
        </div>

        <h3 className="auth-title">Hisobga kirish</h3>
        <p className="auth-desc">
          Buyurtmalar tarixi va savatingizni ko‘rish uchun hisobingizga kiring.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="login-email">
              Elektron pochta
            </label>
            <input
              id="login-email"
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
            <label className="auth-label" htmlFor="login-password">
              Parol
            </label>
            <input
              id="login-password"
              type="password"
              className="auth-input"
              placeholder="Parolingizni kiriting"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <label className="auth-checkbox-row">
            <input
              type="checkbox"
              className="auth-checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Meni eslab qol</span>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="auth-submit-btn">
            Kirish
          </button>
        </form>

        <p className="auth-demo-hint">
          Demo hisob: <strong>azizbek@example.com</strong> / parol: <strong>123456</strong>
        </p>

        <p className="auth-switch">
          Hali hisobingiz yo‘qmi?{" "}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => navigate("/register")}
          >
            Ro‘yxatdan o‘tish
          </button>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
