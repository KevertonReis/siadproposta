import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrlCustom } from "../constants/options";
import styles from "./Login.module.css";


const Login = () => {
  const navigate = useNavigate();

  const [ user, setUser ] = useState('')
  const [ passwd, setPasswd ] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://${apiUrlCustom}/api/login`, {
        user,
        passwd
      });

      localStorage.setItem('token', res.data.token  )
    
      navigate("/layoutprincipal")
      } catch (err) {
       const msg = err.response?.data?.error || "Erro no login";
  alert(msg);
    }
  }
  return (
    <section className={styles.sectionPrincipal}>
      <div className={styles.login}>
        <h1 className={styles.title}>LOGIN</h1>

        <form className={styles.formLogin}>
          <div className={styles.divInputs}>
            <label className={styles.labels} htmlFor="email">
              Usuario
            </label>
            <div></div>
            <input
              onChange={(e) => setUser(e.target.value)}
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
              onChange={(e) => setPasswd(e.target.value)}
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
              onClick={handleSubmit}
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
