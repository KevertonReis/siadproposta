import { useState, useEffect } from "react";
import styles from "./FormDadosOrc.module.css";
import { useNavigate } from "react-router-dom";

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
    vistoriador: "",
    nomeFantasia: "",
    codCliente: "",
    prestadorAtual: "",
  });

  const [vistoriador, setVistoriador] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      const [vis] = await Promise.all([
        fetch("http://localhost:3001/api/vistoriador").then((r) => r.json()),
      ]);

      setVistoriador(vis);
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     const [pro] = await Promise.all([
  //       fetch(`http://localhost:3001/api/proposta/${codigoBusca}`).then((r) => r.json()),
  //     ]);
  //     console.log(pro)

  //     setPropostas(pro);
  //   }
  //   fetchData();
  // }, );

  const handleBuscar = async () => {
    const encontrado = await Promise.all([
      fetch(`http://localhost:3001/api/proposta/${codigoBusca}`).then((r) =>
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
        vistoriador: encontrado[0].VISTORIADOPOR,
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
        vistoriador: "",
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

  return (
    <>
      <section className={styles.secPrincipal}>
        {/* DADOS DA PROPOSTA */}
        <form className={styles.formDadosProposta}>
          <div className={styles.divTitle}>
            <h2>DADOS DA PROPOSTA</h2>
          </div>
          <div className={styles.divPrincipal}>
            <div className={styles.buscaProposta}>
              <label>Nº da proposta</label>
              <div className={styles.divInputButtonBuscar}>
                <input
                  className={styles.inputFind}
                  type="text"
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
                  <button type="button" className={styles.buttonEdit}>
                    Editar proposta
                  </button>
                )}
              </div>
            </div>
            {propostas.nroPro === "" ? (
              <p></p>
            ) : (
              <div className={styles.dadosProposta}>
                <div className={styles.itemProposta}>
                  <label className="">Data da proposta:</label>
                  <input
                    type="text"
                    className=""
                    value={propostas.dataProposta}
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
                  <label className="">Vistoriado por:</label>
                  <input
                    type="text"
                    className=""
                    value={propostas.vistoriador}
                  />
                </div>
                <div className={styles.itemProposta}>
                  <label className="">Assessor responsavel:</label>
                  <input type="text" className="" value={propostas.assessor} />
                </div>
              </div>
            )}

            <div className={styles.divButtonBack}>
              <button
                type="button"
                className={styles.buttonBack}
                onClick={() => navigate("/")}
              >
                Voltar
              </button>
            </div>
          </div>
        </form>
        <form className={styles.formDadosProposta}>
          {/* Data final vistoria  */}
          <div className={styles.divLabel}>
            <label className="">Data de devolução da vistoria:</label>
            <input
              type="date"
              className={styles.inputText}
              placeholder=""
              value={dados.dataProposta}
              onChange={(e) => handleChange("dataProposta", e.target.value)}
              required
            />
          </div>

          <div className={styles.divLabel}>
            <label className="">Vistoriado por:</label>
            <select
              className={styles.select}
              value={vistoriador.vistoriador}
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

          <div className={styles.divLabel}>
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
           <div className={styles.divLabel}>
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

        </form>
      </section>
    </>
  );
};

export default FormDadosOrc;
