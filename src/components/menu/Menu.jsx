import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { menuOptions } from "./constants/menu-options";

const Menu = () => {
  const navigate = useNavigate();

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
