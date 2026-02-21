import styles from "./FormCadRamo.module.css";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { apiUrlCustom } from "../../constants/options";

export default function FormCadRamo() {
  const navigate = useNavigate();

  const [ramo, setRamo] = useState({
    descRamo: "",
  });

  const handleChange = (field, value) => {
    setRamo((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setRamo({
      descRamo: "",
    });

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${apiUrlCustom}/api/cadastroramo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ramo),
      });

      if (!res.ok) throw new Error("Erro ao salvar");
      alert("Cliente cadastrado com sucesso!");
      setRamo({
        descRamo: "",
      });
    } catch (err) {
      alert("Falha ao salvar: " + err.message);
    }
  };

  return (
    <div className={styles.divPrincipal}>
      <h2 className={styles.titleForm}>Ramo de atividade</h2>

      <form onSubmit={handleSubmit} className={styles.formCad} id="formCad">
        {/* Razão Social */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ramo de atividade
          </label>
          <input
            type="text"
            className={styles.inputText}
            placeholder="Insira o ramo de ativiade"
            value={ramo.descRamo}
            onChange={(e) => handleChange("descRamo", e.target.value)}
            required
          />
        </div>

        {/* Botões salvar e cancelar */}
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
      </form>
    </div>
  );
}
