import { useState, useEffect } from "react";
import styles from "./FormCadCliente.module.css";
import { useNavigate } from "react-router-dom";
import { apiUrlCustom } from "../../constants/options";

export default function FormCadCliente() {
  const [formData, setFormData] = useState({
    cnpj: "",
    razaoSocial: "",
    status: "",
    tipoCliente: "",
    assessor: "",
    anotacoes: "",
  });


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleClear = () => {
    setFormData ({
      cnpj: "",
      razaoSocial: "",
      status: "",
      tipoCliente: "",
      assessor: "",
      anotacoes: "",
    })

    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${apiUrlCustom}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao salvar");
      alert("Cliente cadastrado com sucesso!");
      setFormData({
        cnpj: "",
        razaoSocial: "",
        status: "",
        tipoCliente: "",
        anotacoes: "",
        assessor: "",
      });
      navigate("/")
    } catch (err) {
      alert("Falha ao salvar: " + err.message);
    }
  };

  const [tipoClienteList, setTipoClienteList] = useState([]);
  const [statusClienteList, setStatusClienteList] = useState([]);
  const [assessorList, setAssessorList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [tp, sc, ass] = await Promise.all([
        fetch(`http://${apiUrlCustom}/api/tipocliente`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/statuscliente`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/assessor`).then((r) => r.json()),
      ]);

      setTipoClienteList(tp);
      setStatusClienteList(sc);
      setAssessorList(ass);
    }
    fetchData();
  }, []);


  return (
    <div className={styles.divPrincipal}>
      <h2 className={styles.titleForm}>
        Cadastro de Cliente
      </h2>

      <form onSubmit={handleSubmit} className={styles.formCad} id="formCad">
        {/* CNPJ */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CPNJ
          </label>
          <input
            type="text"
            className={styles.inputText}
            placeholder="C.N.P.J"
            value={formData.cnpj}
            onChange={(e) => handleChange("cnpj", e.target.value)}
            required
          />
        </div>

        {/* Razão Social */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Razão Social
          </label>
          <input
            type="text"
            className={styles.inputText}
            placeholder="Digite a razão social"
            value={formData.razaoSocial}
            onChange={(e) => handleChange("razaoSocial", e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className={styles.select}
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {statusClienteList.map((t) => (
              <option key={t.COD_STA} value={t.COD_STA}>
                {t.DES_STA}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Cliente */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Cliente
          </label>
          <select
            className={styles.select}
            value={formData.tipoCliente}
            onChange={(e) => handleChange("tipoCliente", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {tipoClienteList.map((t) => (
              <option key={t.COD_TIPO} value={t.COD_TIPO}>
                {t.DES_TIPO}
              </option>
            ))}
          </select>
        </div>

        {/* Assessor */}
        <div className={styles.divLabel}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assessor
          </label>
          <select
            className={styles.select}
            value={formData.assessor}
            onChange={(e) => handleChange("assessor", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {assessorList.map((t) => (
              <option key={t.COD_ASS} value={t.COD_ASS}>
                {t.DES_ASS}
              </option>
            ))}
          </select>
        </div>

        {/* Anotações */}
        <div className={styles.divTextArea}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anotações
          </label>
          <textarea
            className={styles.inputTextArea}
            placeholder="Observações ou detalhes adicionais"
            rows="5"
            value={formData.anotacoes}
            onChange={(e) => handleChange("anotacoes", e.target.value)}
          ></textarea>
        </div>

        {/* Botões salvar e cancelar */}
        <div className={styles.divButtonSaveCancel}>
          <button
            type="button"
            className={styles.buttonCancel}
            onClick={() => {handleClear()}}
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
