import { useState, useEffect } from "react";
import styles from "./FormDadosOrc.module.css";
import { useNavigate } from "react-router-dom";
import { apiUrlCustom, formatarData } from "../../constants/options";

const FormDadosOrc = () => {
  const [codigoBusca, setCodigoBusca] = useState("");

  const [propostas, setPropostas] = useState({
    nroPro: "",
    razaoSocial: "",
    dataProposta: "",
    statusProposta: "",
    objeto: "",
    empresa: "",
    licitacao: "",
    plataforma: "",
    tipoReajuste: "",
    observacoes: "",
    repLegal: "",
    nomeFantasia: "",
    codCliente: "",
    prestadorAtual: "",
  });

  const [dados, setDados] = useState({
    nroPro: "",
    dataFinal: "",
    vistoriador: "",
    qtdeQuadro: "",
    vigencia: "",
    valOrcamento: "",
    cct: "",
    valApresentado: "",
    lucro: "",
    valVencedor: "",
    empVencedor: "",
    colocacao: "",
    codContrato: "",
    observacoes: "",
  });

  const [vistoriador, setVistoriador] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [vis] = await Promise.all([
        fetch(`http://${apiUrlCustom}/api/vistoriador`).then((r) => r.json()),
      ]);

      setVistoriador(vis);
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://${apiUrlCustom}/api/enviarorcamento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) throw new Error("Erro ao salvar");
      alert("Proposta cadastrada com sucesso!");
      setDados({
        nroPro: "",
        dataFinal: "",
        vistoriador: "",
        qtdeQuadro: "",
        vigencia: "",
        valOrcamento: "",
        cct: "",
        valApresentado: "",
        lucro: "",
        valVencedor: "",
        empVencedor: "",
        colocacao: "",
        codContrato: "",
        observacoes: "",
      });
      navigate("/");
    } catch (err) {
      alert("Falha ao salvar: " + err.message);
    }
  };

  // const handlelog = async () => {
  //   console.log("encontrado", propostas.nroPro);
  // };

  const handleBuscar = async () => {
    const encontrado = await Promise.all([
      fetch(`http://${apiUrlCustom}/api/proposta/${codigoBusca}`).then((r) =>
        r.json()
      ),
    ]);

    console.log("encontrado", encontrado);

    if (encontrado) {
      setPropostas({
        nroPro: encontrado[0].NROPRO,
        razaoSocial: encontrado[0].DESCLIENTE,
        dataProposta: encontrado[0].DATAPRO,
        statusProposta: encontrado[0].STATUS,
        objeto: encontrado[0].OBJETO,
        empresa: encontrado[0].EMPPRO,
        licitacao: encontrado[0].LICITACAO,
        plataforma: encontrado[0].PLATAFORMA,
        tipoReajuste: encontrado[0].TIPOREAJUSTE,
        observacoes: encontrado[0].OBSERVACOES,
        repLegal: encontrado[0].REP_LEGAL,
        nomeFantasia: encontrado[0].NOME_FANTASIA,
        codCliente: encontrado[0].CODCLIENTE,
        prestadorAtual: encontrado[0].PRESTADOR_ATUAL,
        assessor: encontrado[0].ASSESSOR,
      });
    }
    if (!encontrado[0].NROPRO) {
      setPropostas({
        nroPro: "",
        razaoSocial: "",
        dataProposta: "",
        statusProposta: "",
        objeto: "",
        empresa: "",
        licitacao: "",
        plataforma: "",
        tipoReajuste: "",
        observacoes: "",
        repLegal: "",
        nomeFantasia: "",
        codCliente: "",
        prestadorAtual: "",
        assessor: "",
      });
    }
  };

  const handleChange = (field, value) => {
    setDados((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBuscar();
    }
  };

  const handleEdit = async () => {
    const encontradoEdicao = await Promise.all([
      fetch(`http://${apiUrlCustom}/api/propostaedit/${codigoBusca}`).then(
        (r) => r.json()
      ),
    ]);

    console.log("encontrado", encontradoEdicao);
    let dadosEnviados = {};

    if (encontradoEdicao) {
      dadosEnviados = {
        nroPro: encontradoEdicao[0].NRO_PRO,
        dataProposta: encontradoEdicao[0].DATA_PRO,
        statusProposta: encontradoEdicao[0].STATUS,
        objeto: encontradoEdicao[0].OBJETO,
        empresa: encontradoEdicao[0].EMP_PRO,
        licitacao: encontradoEdicao[0].LICITACAO,
        plataforma: encontradoEdicao[0].PLATAFORMA,
        tipoReajuste: encontradoEdicao[0].TIPO_REAJUSTE,
        observacoes: encontradoEdicao[0].OBSERVACOES,
        repLegal: encontradoEdicao[0].REP_LEGAL,
        nomeFantasia: encontradoEdicao[0].NOME_FANTASIA,
        codCliente: encontradoEdicao[0].COD_CLI,
        prestadorAtual: encontradoEdicao[0].PRESTADOR_ATUAL,
        assessor: encontradoEdicao[0].ASSESSOR,
      };
    }
    if (!encontradoEdicao[0].NROPRO) {
      setPropostas({
        nroPro: "",
        razaoSocial: "",
        dataProposta: "",
        statusProposta: "",
        objeto: "",
        empresa: "",
        licitacao: "",
        plataforma: "",
        tipoReajuste: "",
        observacoes: "",
        repLegal: "",
        nomeFantasia: "",
        codCliente: "",
        prestadorAtual: "",
        assessor: "",
      });
    }

    navigate("/editproposta", { state: dadosEnviados });
    console.log("edit: ", dadosEnviados);
  };

  return (
    <>
      <section className={styles.secPrincipal}>
        <div className={styles.buscaProposta}>
          <div className={styles.divLabelBusca}>
            <label>Nº da proposta</label>
          </div>
          <div className={styles.divInputButtonBuscar}>
            <input
              className={styles.inputFind}
              type="number"
              value={codigoBusca}
              onChange={(e) => setCodigoBusca(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.buttonFind}
              type="button"
              onClick={handleBuscar}
            >
              Buscar
            </button>
            {propostas.nroPro === "" ? (
              <p></p>
            ) : (
              <button
                type="button"
                className={styles.buttonEdit}
                onClick={handleEdit}
              >
                Editar proposta
              </button>
            )}
          </div>
        </div>
        {/* DADOS DA PROPOSTA */}

        {propostas.nroPro === "" ? (
          <p></p>
        ) : (
          <form className={styles.formDadosProposta}>
            <div className={styles.divTitle}>
              <h2>DADOS DA PROPOSTA</h2>
            </div>
            <div className={styles.divPrincipal}>
              {propostas.nroPro === "" ? (
                <p></p>
              ) : (
                <div className={styles.dadosProposta}>
                  <div className={styles.itemProposta}>
                    <label className="">Data da proposta:</label>
                    <input
                      type="text"
                      className=""
                      value={formatarData(propostas.dataProposta)}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Empresa participante:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.empresa}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Razão social:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.razaoSocial}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Nome fantasia:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.nomeFantasia}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Objeto:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.objeto}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Tipo de contratação:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.tipoReajuste}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Status:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.statusProposta}
                      readOnly
                    />
                  </div>
                  <div className={styles.itemProposta}>
                    <label className="">Prestador atual:</label>
                    <input
                      type="text"
                      className=""
                      value={
                        propostas.prestadorAtual === null || undefined
                          ? "Prestador não informado no cadastro do proposta"
                          : propostas.prestadorAtual
                      }
                      readOnly
                    />
                  </div>

                  <div className={styles.itemProposta}>
                    <label className="">Assessor responsavel:</label>
                    <input
                      type="text"
                      className=""
                      value={propostas.assessor}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {propostas.nroPro === "" ? (
          <p></p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formDadosOrcamento}>
            <div className={styles.divTitle}>
              <h2>DADOS ORÇAMENTARIOS</h2>
            </div>
            {/* Data final vistoria  */}
            <div className={styles.dadosProposta}>
              <div className={styles.itemProposta}>
                <label className="">Data de devolução da vistoria:</label>
                <input
                  type="date"
                  className={styles.inputText}
                  placeholder=""
                  value={dados.dataFinal}
                  onChange={(e) => handleChange("dataFinal", e.target.value)}
                  required
                />
              </div>

              {/* Vistoriador */}
              <div className={styles.itemProposta}>
                <label className="">Vistoriado por:</label>
                <select
                  className={styles.selectOrcamento}
                  value={dados.vistoriador}
                  onChange={(e) => handleChange("vistoriador", e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {vistoriador.map((t) => (
                    <option key={t.COD_FUN} value={t.COD_FUN}>
                      {t.NOME_FUN}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quadro */}
              <div className={styles.itemProposta}>
                <label className="">Quadro:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="Quantidade"
                  value={dados.qtdeQuadro}
                  onChange={(e) => handleChange("qtdeQuadro", e.target.value)}
                  required
                />
              </div>

              {/* Vigencia */}
              <div className={styles.itemProposta}>
                <label className="">Vigencia:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="em meses"
                  value={dados.vigencia}
                  onChange={(e) => handleChange("vigencia", e.target.value)}
                  required
                />
              </div>

              {/* Valor do orcamento */}
              <div className={styles.itemProposta}>
                <label className="">Valor do orçamento:</label>
                <input
                  type="currency"
                  className={styles.inputText}
                  placeholder="R$"
                  value={dados.valOrcamento}
                  onChange={(e) => handleChange("valOrcamento", e.target.value)}
                  required
                />
              </div>

              <div className={styles.itemProposta}>
                <label className="">Ano da CCT:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="aaaa"
                  value={dados.cct}
                  onChange={(e) => handleChange("cct", e.target.value)}
                  required
                />
              </div>

              {/* Valor apresentado */}
              <div className={styles.itemProposta}>
                <label className="">Valor apresentado:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="R$"
                  value={dados.valApresentado}
                  onChange={(e) =>
                    handleChange("valApresentado", e.target.value)
                  }
                  required
                />
              </div>

              {/* Lucro */}
              <div className={styles.itemProposta}>
                <label className="">Lucro:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="%"
                  value={dados.lucro}
                  onChange={(e) => handleChange("lucro", e.target.value)}
                  required
                />
              </div>

              {/* Valor Vencedor */}
              <div className={styles.itemProposta}>
                <label className="">Valor vencedor:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder="R$"
                  value={dados.valVencedor}
                  onChange={(e) => handleChange("valVencedor", e.target.value)}
                  required
                />
              </div>

              {/* Empresa vencedora */}
              <div className={styles.itemProposta}>
                <label className="">Empresa vencedora:</label>
                <input
                  type="text"
                  className={styles.inputText}
                  placeholder="Nome da empresa"
                  value={dados.empVencedor}
                  onChange={(e) => handleChange("empVencedor", e.target.value)}
                  required
                />
              </div>

              {/* colocaçao */}
              <div className={styles.itemProposta}>
                <label className="">Nossa colocação:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder=""
                  value={dados.colocacao}
                  onChange={(e) => handleChange("colocacao", e.target.value)}
                  required
                />
              </div>

              {/* codigo no siad */}
              <div className={styles.itemProposta}>
                <label className="">Numero SIAD:</label>
                <input
                  type="number"
                  className={styles.inputText}
                  placeholder=""
                  value={dados.codContrato}
                  onChange={(e) => handleChange("codContrato", e.target.value)}
                  required
                />
              </div>

              {/* Anotações */}
              <div className={styles.divTextArea}>
                <label className="">Observações:</label>
                <textarea
                  className={styles.inputTextArea}
                  placeholder="Observações ou detalhes adicionais"
                  rows="5"
                  value={dados.observacoes}
                  onChange={(e) => handleChange("observacoes", e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
        )}

        <div className={styles.divButtonBack}>
          <button
            type="button"
            className={styles.buttonBack}
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
          {propostas.nroPro === "" ? (
            <p></p>
          ) : (
            <button
              type="button"
              className={styles.buttonBack}
              value={propostas.nroPro}
              onClick={() => {
                handleChange("nroPro", propostas.nroPro);
                handleSubmit();
              }}
            >
              Salvar
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default FormDadosOrc;
