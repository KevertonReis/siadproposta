import { apiUrlCustom } from "../constants/options";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./CartaCredenciamento.module.css";

const CartaCredenciamento = () => {
  function ConfirmModal({ open, onClose, onConfirm }) {
    if (!open) return null;

    return ReactDOM.createPortal(
      <Backdrop onClose={onClose}>
        <ModalContent onClose={onClose} onConfirm={onConfirm} />
      </Backdrop>,
      document.body
    );
  }

  function Backdrop({ children, onClose }) {
    // Fecha com ESC
    useEffect(() => {
      const handler = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }

  function ModalContent({ onClose, onConfirm }) {
    return (
      <div className="modal-inner">
        <p>Tem certeza que deseja continuar?</p>

        <div className={styles.buttonActions}>
          <button className={styles.buttonCancel} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    );
  }

  const [codigoBusca, setCodigoBusca] = useState();

  const [dados, setDados] = useState({
    titulo: "",
    cidade: "",
    data: "",
    empresa: "",
    destinatario: "",
    corpo: [""],
  });

  const handleBuscar = async () => {
    const propostaCred = await Promise.all([
      fetch(`http://${apiUrlCustom}/api/proposta/${codigoBusca}`).then((r) =>
        r.json()
      ),
    ]);

    if (propostaCred) {
      setDados({
        titulo: "Carta de credenciamento",
        cidade: "São Paulo/SP",
        data: new Date(),
        empresa: "",
        destinatario: `A/C ${propostaCred[0].DESCLIENTE}`,
        corpo: [
          "Prezados senhores,",
          `Credenciamos o Sr. ${propostaCred[0].ASSESSOR}, Portador da cedula de identidade CPF Nº ${propostaCred[0].CPF_VIST}`,
          ``,
        ],
      });
    }
  };

  async function gerarPDF() {
    const response = await fetch(`http://${apiUrlCustom}/api/relatorio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  const [open, setOpen] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBuscar();
    }
  };
  return (
    <>
      <div>
        <div className={styles.buscaProposta}>
          <div className={styles.divLabelBusca}>
            <p>Selecionar proposta para credencial</p>
            <label>Nº da proposta</label>
          </div>
          <div className={styles.divInputButtonBuscar}>
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

        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          GERAR CREDENCIAL{" "}
        </button>
        <ConfirmModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            gerarPDF();
            setOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default CartaCredenciamento;
