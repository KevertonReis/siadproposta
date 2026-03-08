import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.sectionPrincipal}>
      <div className={styles.login}>
        <h1 className={styles.title}>LOGIN</h1>

        <form className={styles.formLogin} method="POST" action="/login">
          <div className={styles.divInputs}>
            <label className={styles.labels} htmlFor="email">
              Usuario
            </label>
            <input
              className={styles.inputEmail}
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.divInputs}>
            <label className={styles.labels} htmlFor="password">
              Senha
            </label>
            <input
              className={styles.inputPasswd}
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </div>

          <div className={styles.inputCheckbox}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label className={styles.labels} htmlFor="remember">
              Lembrar-me
            </label>
          </div>

          <div>
            <button
              className={styles.buttonLogin}
              type="submit"
              onClick={() => navigate("/layoutprincipal")}
            >
              Login
            </button>
          </div>
        </form>

        <div>
          <a href="/forgot-password">Forgot your password?</a>
        </div>

        <div className={styles.forgetPasswd}>
          <p>Don't have account?</p>
          <a href="/register">Criar conta</a>
        </div>
      </div>
    </section>
  );
};

export default Login;
