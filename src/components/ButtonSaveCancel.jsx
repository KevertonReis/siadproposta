import React from "react";
import styles from "./css/ButtonSaveCancel.module.css";
import setFormData from "./FormCadCliente.jsx";
import { useNavigate } from "react-router-dom";

const ButtonSaveCancel = () => {
  const navigate = useNavigate();

  const handleClear = () => {
    setFormData({
      cnpj: "",
      razaoSocial: "",
      status: "",
      tipoCliente: "",
      assessor: "",
      anotacoes: "",
    });

    navigate("/");
  };

  return (
    <div className={styles.divButtonSaveCancel}>
      <button
        type="button"
        className={styles.buttonCancel}
        onClick={() => {
          handleClear();
        }}
      >
        Cancelar
      </button>
      <button type="submit" className={styles.buttonSave}>
        Salvar
      </button>
    </div>
  );
};

export default ButtonSaveCancel;
