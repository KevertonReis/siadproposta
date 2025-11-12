import { useNavigate } from "react-router-dom";
import styles from "./css/Menu.module.css";

const Menu = () => {
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Cadastro de cliente", path: "/cadcliente", color: "blue" },
    {
      label: "Cadastro inicial da proposta",
      path: "/cadproposta",
      color: "gray",
    },
    {
      label: "Orçamento e finalização da proposta",
      path: "/orcamento",
      color: "gray",
    },
    {
      label: "Carta de credenciamento",
      path: "/cartacredenciamento",
      color: "gray",
    },
    { label: "Cadastros diversos", path: "/cadastrosdiversos", color: "gray"},
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <section className={styles.menu}>
        <h2>Menu</h2>
        {menuOptions.map((option) => (
          <button
          className={styles.buttonsMenu}
            key={option.path}
            onClick={() => handleNavigate(option.path)}
          >
            {option.label}
          </button>
        ))}
        
      </section>
    </>
  );
};

export default Menu;
