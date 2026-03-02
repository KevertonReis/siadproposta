import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";

// import { menuOptions } from "./constants/menu-options";

const Menu = () => {
  const navigate = useNavigate();

  console.log;

  return (
    <>
      <aside className={styles.sidebar}>
        <h2>Menu</h2>

        <button onClick={() => navigate("/layoutprincipal/cadcliente")}>
          Cadastro de cliente
        </button>

        <button onClick={() => navigate("/layoutprincipal/cadproposta")}>
          Cadastro inicial da proposta
        </button>

        <button onClick={() => navigate("/layoutprincipal/orcamento")}>
          Orçamento e finalização da proposta
        </button>

        <button onClick={() => navigate("/layoutprincipal/credencial")}>
          Carta de credenciamento
        </button>

        <button onClick={() => navigate("/layoutprincipal/diversos")}>
          Cadastros diversos
        </button>
      </aside>
    </>
  );
};

export default Menu;
