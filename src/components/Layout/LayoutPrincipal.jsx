import { Outlet } from "react-router-dom";
import styles from "./LayoutPrincipal.module.css";
import Menu from "../menu/Menu";

const LayoutPrincipal = () => {
  return (
    <>
      <div className={styles.layout}>
        <Menu />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutPrincipal;
