import styles from "./CartaCredenciamento.module.css";
import { gerarPDF, apiUrlCustom } from "../constants/options";
import { useState } from "react";

const CartaCredenciamento = () => {
  const [dadosDaProposta, setDadosDaProposta] = useState({
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
  const [codigoBusca, setCodigoBusca] = useState();

  const [dadosDaCredencial, setDadosDaCredencial] = useState({
    proposta: "",
    titulo: "",
    cidade: "",
    data: "",
    empresa: "",
    destinatario: "",
    corpo: [""],
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBuscar();
    }
  };

  const handleBuscar = async () => {
    const encontrado = await Promise.all([
      fetch(`http://${apiUrlCustom}/api/proposta/${codigoBusca}`).then((r) =>
        r.json()
      ),
    ]);

    console.log("encontrado", encontrado);

    if (encontrado) {
      setDadosDaProposta({
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
      }),
        setDadosDaCredencial({
          proposta: `Prop. ${encontrado[0].NROPRO}`,
          titulo: "Carta de credenciamento",
          cidade: "São Paulo/SP",
          data: new Date(),
          empresa: encontrado[0].EMPPRO,
          destinatario: `A/C ${encontrado[0].DESCLIENTE}`,
          corpo: [
            "Prezados senhores,",
            `Credenciamos o(a) Sr(a) ${encontrado[0].NOME_VIST}, Portador da cedula de identidade CPF Nº ${encontrado[0].CPF_VIST}, a efetuar vistoria no(s) local(is) do objeto licitado, para fins de conhecimento das condições para excução dos serviços, elaboração de proposta e participação do certame licitatório.`,
          ],

          repLegal: encontrado[0].REP_LEGAL,
          repFunc: encontrado[0].REP_FUNCAO,
        });
    }
    if (!encontrado[0].NROPRO) {
      setDadosDaProposta({
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
      }),
        setDadosDaCredencial({
          proposta: "",
          titulo: "",
          cidade: "",
          data: "",
          empresa: "",
          destinatario: "",
          corpo: [""],
        });
    }
  };

  const handleChange = (field, value) => {
    setDadosDaProposta((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.contentPrincipal}>
      <div className={styles.dadosProposta}>
        <div className={styles.buscaProposta}>
          <div className={styles.divLabelBusca}>
            <h2>Selecionar proposta para credencial</h2>
          </div>
          <div className={styles.divInputButtonBuscar}>
            <label>Nº da proposta</label>
            <input
              className={styles.inputFind}
              type="number"
              value={codigoBusca}
              onChange={(e) => {
                const v = e.target.value;
                setCodigoBusca(v);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.buttonFind}
              type="button"
              onClick={handleBuscar}
            >
              Buscar
            </button>
          </div>
        </div>
        <form className={styles.formCad} id="formCadProp">
          {/* Cliente  */}
          <div className={styles.divLabel}>
            <label className="">Cliente:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.nomeFantasia}
            />
          </div>

          {/* Status  */}
          <div className={styles.divLabel}>
            <label className="">Status:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.statusProposta}
              readOnly
            />
          </div>

          {/* Empresa responsavel  */}
          <div className={styles.divLabel}>
            <label className="">Empresa responsável:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.empresa}
              readOnly
            />
          </div>

          {/* objeto */}
          <div className={styles.divLabel}>
            <label className="">Objeto:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.objeto}
              readOnly
            />
          </div>

          {/* Licitação */}
          <div className={styles.divLabel}>
            <label className="">Licitação:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.licitacao}
              onChange={(e) => handleChange("licitacao", e.target.value)}
              readOnly
            />
          </div>

          {/* Representante legal */}
          <div className={styles.divLabel}>
            <label className="">Representante legal:</label>
            <input
              type="text"
              className={styles.inputText}
              placeholder=""
              value={dadosDaProposta.repLegal}
              readOnly
            />
          </div>
        </form>

        <div className={styles.divButtonCredencial}>
          {dadosDaProposta.empresa && (
            <button
              className={styles.buttonCredencial}
              onClick={() => gerarPDF(dadosDaCredencial)}
            >
              GERAR CREDENCIAL
            </button>
          )}
          {!dadosDaProposta.empresa &&
            dadosDaProposta.empresa === undefined && (
              <p> Proposta não encontrada! </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default CartaCredenciamento;
