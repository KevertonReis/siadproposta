import { Outlet, useNavigate } from "react-router-dom";
import styles from "./MenuCadDiversos.module.css";

export default function MenuCadDiversos() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.sidebar}>
        <h2>Cadastros diversos</h2>
        <button onClick={() => navigate("/diversos/cadramo")}>
          Ramo de atividade
        </button>
      </div>
      <Outlet />
    </>
  );
}
