import { Outlet, useNavigate } from "react-router-dom";
import styles from "./LayoutPrincipal.module.css";
import Menu from "../menu/Menu";
import { useEffect } from "react";
import { apiUrlCustom } from "../constants/options";
import axios from "axios";

const LayoutPrincipal = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const validarUsuario = async () => {
  //     const token = localStorage.getItem("token");

  //     console.log(token);

  //     if (!token) navigate("/");

  //     try {
  //       const response = await axios.get(
  //         `http://${apiUrlCustom}/api/validacao`,
  //         {
  //           headers: { authorization: `Bearer ${token}` },
  //         },
  //       );

  //       if (response.status === 403) {
  //         navigate("/");
  //       } else {
  //         console.log(`Acesso autorizado, ${response.data.user.user}!`);
  //       }
  //     } catch (error) {
  //       navigate("/");
  //       console.error({ error });
  //     }
  //   };
  //   validarUsuario();
  // }, []);

  return (
    <div className={styles.layout}>
      <Menu />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPrincipal;
