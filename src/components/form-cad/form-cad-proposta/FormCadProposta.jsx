import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrlCustom } from "../../constants/options";

const FormCadProposta = () => {
  const [formData, setFormData] = useState({
    dataProposta: "",
    statusProposta: "",
    empresa: "",
    licitacao: "",
    plataforma: "",
    tipoReajuste: "",
    observacoes: "",
    repLegal: "",
    codVistoriador: "",
    nomeFantasia: "",
    codCliente: "",
    objeto: "",
    prestadorAtual: "",
    assessor: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  const handleClear = () => {
    setFormData({
      dataProposta: "",
      statusProposta: "",
      empresa: "",
      licitacao: "",
      assessor: "",
      objeto: "",
      plataforma: "",
      tipoReajuste: "",
      observacoes: "",
      repLegal: "",
      codVistoriador: "",
      nomeFantasia: "",
      codCliente: "",
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${apiUrlCustom}/api/enviarproposta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao salvar");
      alert("Proposta cadastrada com sucesso!");
      setFormData({
        dataProposta: "",
        statusProposta: "",
        empresa: "",
        licitacao: "",
        plataforma: "",
        tipoReajuste: "",
        observacoes: "",
        repLegal: "",
        codVistoriador: "",
        nomeFantasia: "",
        codCliente: "",
        objeto: "",
        prestadorAtual: "",
        assessor: "",
      });
      navigate("/");
    } catch (err) {
      alert("Falha ao salvar: " + err.message);
    }
  };

  const [statusProposta, setStatusProposta] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [tipoReajuste, setTipoReajuste] = useState([]);
  const [repLegal, setRepLegal] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [objeto, setObjeto] = useState([]);
  const [assessor, setAssessor] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [stp, emp, tpr, rpl, cli, obj, ass] = await Promise.all([
        fetch(`http://${apiUrlCustom}/api/statusvistoria`).then((r) =>
          r.json()
        ),
        fetch(`http://${apiUrlCustom}/api/empresa`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/tiporeajuste`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/replegal`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/clientes`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/objeto`).then((r) => r.json()),
        fetch(`http://${apiUrlCustom}/api/assessor`).then((r) => r.json()),
      ]);

      setStatusProposta(stp);
      setEmpresa(emp);
      setTipoReajuste(tpr);
      setRepLegal(rpl);
      setCliente(cli);
      setObjeto(obj);
      setAssessor(ass);
    }
    fetchData();
  }, []);

  return (
    <div className="divPrincipal">
      <h2 className="titleForm">Cadastro de proposta</h2>

      <form onSubmit={handleSubmit} className="formCad" id="formCadProp">
        {/* Cliente  */}
        <div className="divLabel">
          <label className="">Cliente:</label>
          <select
            className="select"
            value={formData.codCliente}
            onChange={(e) => handleChange("codCliente", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {cliente.map((t) => (
              <option key={t.COD_CLI} value={t.COD_CLI}>
                {t.RAZ_CLI}
              </option>
            ))}
          </select>
        </div>

        {/* Nome fantasia */}
        <div className="divLabel">
          <label className="">Nome fantasia:</label>
          <input
            type="text"
            className="inputText"
            placeholder=""
            value={formData.nomeFantasia}
            onChange={(e) => handleChange("nomeFantasia", e.target.value)}
            required
          />
        </div>

        {/* Data */}
        <div className="divLabel">
          <label className="">Data da proposta:</label>
          <input
            type="date"
            className="inputText"
            placeholder=""
            value={formData.dataProposta}
            onChange={(e) => handleChange("dataProposta", e.target.value)}
            required
          />
        </div>

        {/* Status  */}
        <div className="divLabel">
          <label className="">Status:</label>
          <select
            className="select"
            value={formData.statusProposta}
            onChange={(e) => handleChange("statusProposta", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {statusProposta.map((t) => (
              <option key={t.COD_STA} value={t.COD_STA}>
                {t.DES_STA}
              </option>
            ))}
          </select>
        </div>

        {/* Empresa responsavel  */}
        <div className="divLabel">
          <label className="">Empresa responsável:</label>
          <select
            className="select"
            value={formData.empresa}
            onChange={(e) => handleChange("empresa", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {empresa.map((t) => (
              <option key={t.COD_EMP} value={t.COD_EMP}>
                {t.RAZ_EMP}
              </option>
            ))}
          </select>
        </div>

        {/* objeto */}
        <div className="divLabel">
          <label className="">Objeto:</label>
          <select
            className="select"
            value={formData.objeto}
            onChange={(e) => handleChange("objeto", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {objeto.map((t) => (
              <option key={t.COD_OBJ} value={t.COD_OBJ}>
                {t.DES_OBJ}
              </option>
            ))}
          </select>
        </div>

        {/* Licitação */}
        <div className="divLabel">
          <label className="">Licitação:</label>
          <input
            type="text"
            className="inputText"
            placeholder=""
            value={formData.licitacao}
            onChange={(e) => handleChange("licitacao", e.target.value)}
            required
          />
        </div>

        {/* Plataforma */}
        <div className="divLabel">
          <label className="">Plataforma:</label>
          <input
            type="text"
            className="inputText"
            placeholder=""
            value={formData.plataforma}
            onChange={(e) => handleChange("plataforma", e.target.value)}
            required
          />
        </div>

        {/* Empresa atual */}

        <div className="divLabel">
          <label className="">Prestador atual:</label>
          <input
            type="text"
            className="inputText"
            placeholder=""
            value={formData.prestadorAtual}
            onChange={(e) => handleChange("prestadorAtual", e.target.value)}
            required
          />
        </div>

        {/* Tipo de reajuste  */}
        <div className="divLabel">
          <label className="">Tipo de reajuste:</label>
          <select
            className="select"
            value={formData.tipoReajuste}
            onChange={(e) => handleChange("tipoReajuste", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {tipoReajuste.map((t) => (
              <option key={t.COD_TIPO} value={t.COD_TIPO}>
                {t.DES_TIPO}
              </option>
            ))}
          </select>
        </div>

        {/* assessor */}
        <div className="divLabel">
          <label className="">Assessor:</label>
          <select
            className="select"
            value={formData.assessor}
            onChange={(e) => handleChange("assessor", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {assessor.map((t) => (
              <option key={t.COD_ASS} value={t.COD_ASS}>
                {t.DES_ASS}
              </option>
            ))}
          </select>
        </div>

        {/* Representante legal */}
        <div className="divLabel">
          <label className="">Representante legal:</label>
          <select
            className="select"
            value={formData.repLegal}
            onChange={(e) => handleChange("repLegal", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {repLegal.map((t) => (
              <option key={t.COD_REP} value={t.COD_REP}>
                {t.NOM_REP}
              </option>
            ))}
          </select>
        </div>

        {/* Anotações */}
        <div className="divTextArea">
          <label className="">Observações:</label>
          <textarea
            className="inputTextrea"
            placeholder="Observações ou detalhes adicionais"
            rows="5"
            value={formData.observacoes}
            onChange={(e) => handleChange("observacoes", e.target.value)}
          ></textarea>
        </div>

        {/* Botões salvar e cancelar */}
        <div className="divButtonSaveCancel">
          <button
            type="button"
            className="buttonCancel"
            onClick={() => {
              handleClear();
            }}
          >
            Cancelar
          </button>
          <button type="submit" className="buttonSave">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCadProposta;
