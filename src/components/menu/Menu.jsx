import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
// import { menuOptions } from "./constants/menu-options";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <>
      <aside className={styles.sidebar}>
        <h2>Menu</h2>

        <button onClick={() => navigate("/cadcliente")}>
          Cadastro de cliente
        </button>

        <button onClick={() => navigate("/cadproposta")}>
          Cadastro inicial da proposta
        </button>

        <button onClick={() => navigate("/orcamento")}>
          Orçamento e finalização da proposta
        </button>

        <button onClick={() => navigate("/credencial")}>
          Carta de credenciamento
        </button>

        <button onClick={() => navigate("/diversos")}>
          Cadastros diversos
        </button>
      </aside>
    </>
  );
};

export default Menu;
