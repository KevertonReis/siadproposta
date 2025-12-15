import express from "express";
import cors from "cors";
import Firebird from "node-firebird";
import { options } from "./dbConfig.js";
import { formatDateCredencial } from "./src/components/constants/options.js";
import PDFDocument from "pdfkit";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;
const ip = "0.0.0.0";

// 🔹 Função helper para query
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) return reject(err);
      db.query(sql, params, (err, result) => {
        db.detach();
        if (err) reject(err);
        else resolve(result);
      });
    });
  });
}

// 🔹 Teste de conexão
app.get("/api/teste", (req, res) => {
  Firebird.attach(options, (err, db) => {
    if (err) {
      console.error("Erro ao conectar ao Firebird:", err);
      return res.status(500).json({ erro: "Falha na conexão" });
    }

    db.query("SELECT CURRENT_TIMESTAMP FROM RDB$DATABASE", (err, result) => {
      db.detach();
      if (err) {
        console.error("Erro na consulta:", err);
        return res.status(500).json({ erro: "Erro na query" });
      }
      res.json(result);
    });
  });
});

// GET - TABELAS AUXILIARES

app.get("/api/tipocliente", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_TIPO, DES_TIPO FROM TIPO_CLIENTE ORDER BY COD_TIPO"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/statuscliente", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_STA, DES_STA FROM STATUS_CLIENTE ORDER BY COD_STA"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/assessor", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_ASS, DES_ASS FROM ASSESSOR_TB ORDER BY COD_ASS"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/statusvistoria", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_STA, DES_STA FROM STATUS_VISTORIA ORDER BY COD_STA"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/empresa", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_EMP, RAZ_EMP FROM EMPRESA_TB ORDER BY COD_EMP"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/tiporeajuste", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_TIPO, DES_TIPO FROM TIPO_REAJUSTE ORDER BY COD_TIPO"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/replegal", async (req, res) => {
  try {
    const rows = await runQuery(
      "select COD_REP, FUNCAO, CPF, RG, EMPRESA, NOM_REP, COD_EMP FROM REPRESENTANTE_LEGAL"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/vistoriador", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_FUN, NOME_FUN, FUNCAO, CPF FROM VISTORIADORES"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/clientes", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_CLI, CNPJ, RAZ_CLI, STATUS, TIPO_CLI, ANOTACOES, ASSESSOR FROM CLIENTES_TB"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/proposta", async (req, res) => {
  try {
    const rows = await runQuery(
      "select NRO_PRO, DATA_PRO, STATUS, EMP_PRO, LICITACAO, PLATAFORMA, TIPO_REAJUSTE, OBSERVACOES, REP_LEGAL, COD_VIS, NOME_FANTASIA, COD_CLI from PROPOSTA_TB"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/objeto", async (req, res) => {
  try {
    const rows = await runQuery(
      "SELECT COD_OBJ, DES_OBJ FROM OBJETO_TB ORDER BY COD_OBJ"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao listar tipos" });
  }
});

app.get("/api/dadoscredenciamento/:codigo", (req, res) => {
  const { codigo } = req.params;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "select RAZ_EMP, LICITACAO, NRO_PRO, TEXTO, NOME_VIST, CPF_VIST, EMP_PRO, REP_LEGAL, FUNCAO_REP, CNPJ from GERA_CARTA_CRED where CODCLI = ? ",
      [codigo],
      (err, result) => {
        db.detach();
        if (err) return res.status(500).json({ error: err.message });

        if (!result || result.length === 0) {
          return res.status(404).json({ message: "Proposta não encontrada" });
        }

        res.json(result[0]);
      }
    );
  });
});

app.get("/api/proposta/:codigo", (req, res) => {
  const { codigo } = req.params;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "SELECT * FROM CONSULTA_PROPOSTA WHERE NROPRO = ?",
      [codigo],
      (err, result) => {
        db.detach();
        if (err) return res.status(500).json({ error: err.message });

        if (!result || result.length === 0) {
          return res.status(404).json({ message: "Proposta não encontrada" });
        }

        res.json(result[0]);
      }
    );
  });
});

app.get("/api/propostaedit/:codigo", (req, res) => {
  const { codigo } = req.params;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(
      "SELECT * FROM PROPOSTA_TB WHERE NRO_PRO = ?",
      [codigo],
      (err, result) => {
        db.detach();
        if (err) return res.status(500).json({ error: err.message });

        if (!result || result.length === 0) {
          return res.status(404).json({ message: "Proposta não encontrada" });
        }

        res.json(result[0]);
      }
    );
  });
});

// POST - CADASTROS
app.post("/api/clientes", (req, res) => {
  const { cnpj, razaoSocial, status, tipoCliente, anotacoes, assessor } =
    req.body;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ erro: "Falha na conexão" });

    const sql = `
      INSERT INTO CLIENTES_TB (CNPJ, RAZ_CLI, STATUS, TIPO_CLI, ANOTACOES, ASSESSOR)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [cnpj, razaoSocial, status, tipoCliente, anotacoes, assessor],
      (err) => {
        db.detach();
        if (err) {
          console.error("Erro ao inserir:", err);
          return res.status(500).json({ erro: "Erro ao inserir cliente" });
        }
        res.json({ sucesso: true });
      }
    );
  });
});

app.post("/api/enviarproposta", (req, res) => {
  const {
    dataProposta,
    statusProposta,
    empresa,
    licitacao,
    plataforma,
    tipoReajuste,
    observacoes,
    repLegal,
    nomeFantasia,
    codCliente,
    objeto,
    prestadorAtual,
    assessor,
  } = req.body;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ erro: "Falha na conexão" });

    const sql = `INSERT INTO PROPOSTA_TB (DATA_PRO, STATUS, EMP_PRO, LICITACAO, PLATAFORMA, 
                                          TIPO_REAJUSTE, OBSERVACOES, REP_LEGAL, NOME_FANTASIA, 
                                          COD_CLI, OBJETO, PRESTADOR_ATUAL, ASSESSOR)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    db.query(
      sql,
      [
        dataProposta,
        statusProposta,
        empresa,
        licitacao,
        plataforma,
        tipoReajuste,
        observacoes,
        repLegal,
        nomeFantasia,
        codCliente,
        objeto,
        prestadorAtual,
        assessor,
      ],
      (err) => {
        db.detach();
        if (err) {
          console.error("Erro ao inserir:", err);
          return res.status(500).json({ erro: "Erro ao inserir cliente" });
        }
        res.json({ sucesso: true });
      }
    );
  });
});

app.post("/api/editarproposta", (req, res) => {
  const {
    dataProposta,
    statusProposta,
    empresa,
    licitacao,
    plataforma,
    tipoReajuste,
    observacoes,
    repLegal,
    nomeFantasia,
    codCliente,
    objeto,
    prestadorAtual,
    assessor,
    nroPro,
  } = req.body;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ erro: "Falha na conexão" });

    const sql = `UPDATE PROPOSTA_TB 
                 SET DATA_PRO = ?, STATUS = ?, EMP_PRO = ?, LICITACAO = ?, PLATAFORMA = ?, 
                     TIPO_REAJUSTE = ?, OBSERVACOES = ?, REP_LEGAL = ?, NOME_FANTASIA = ?, 
                     COD_CLI = ?, OBJETO = ?, PRESTADOR_ATUAL = ?, ASSESSOR = ?
                 WHERE NRO_PRO = ?
    `;
    db.query(
      sql,
      [
        dataProposta,
        statusProposta,
        empresa,
        licitacao,
        plataforma,
        tipoReajuste,
        observacoes,
        repLegal,
        nomeFantasia,
        codCliente,
        objeto,
        prestadorAtual,
        assessor,
        nroPro,
      ],
      (err) => {
        db.detach();
        if (err) {
          console.error("Erro ao inserir:", err);
          return res.status(500).json({ erro: "Erro ao salvar proposta" });
        }
        res.json({ sucesso: true });
      }
    );
  });
});

app.post("/api/enviarorcamento", (req, res) => {
  const {
    nroPro,
    dataFinal,
    vistoriador,
    qtdeQuadro,
    vigencia,
    valOrcamento,
    cct,
    valApresentado,
    lucro,
    valVencedor,
    empVencedor,
    colocacao,
    codContrato,
    observacoes,
  } = req.body;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ erro: "Falha na conexão" });

    const sql = `INSERT INTO DADOS_ORCAMENTARIOS (NRO_PRO, DATA_FINAL_VIST, QTDE_QUADRO, VIGENCIA,
                                                 VALOR_ORCAMENTO, CCT, VALOR_APRESENTADO, LUCRO,
                                                 VALOR_VENCEDOR, EMP_VENCEDORA, COLOCACAO, COD_CONTRATO,
                                                 OBSERVACOES, COD_VIST)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    db.query(
      sql,
      [
        nroPro,
        dataFinal,
        vistoriador,
        qtdeQuadro,
        vigencia,
        valOrcamento,
        cct,
        valApresentado,
        lucro,
        valVencedor,
        empVencedor,
        colocacao,
        codContrato,
        observacoes,
      ],
      (err) => {
        db.detach();
        if (err) {
          console.error("Erro ao inserir:", err);
          return res.status(500).json({ erro: "Erro ao inserir cliente" });
        }
        res.json({ sucesso: true });
      }
    );
  });
});

// ======================================== GERADOR DE RELATORIO ========================================

app.post("/api/relatorio", (req, res) => {
  // Helper para formatar data em pt-BR
  

  const data = req.body || {};

  // exemplo de dados esperados (substitua pelo seu payload)
  const payload = {
    proposta: data.proposta,
    titulo: data.titulo,
    cidade: data.cidade || "Cidade/UF",
    data: data.data,
    empresa: data.empresa || "Empresa Exemplo Ltda.",
    destinatario: data.destinatario || "A/C ",
    corpo: data.corpo,
    assinante: data.assinante || {
      nome: "Nome do Assinante",
      cargo: "Cargo do Assinante",
    },
    
  };

  const doc = new PDFDocument({ margin: 50, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=carta-credenciamento.pdf`
  );

  doc.pipe(res);

  // nro proposta
  doc.font("Helvetica").fontSize(6).text(payload.proposta);
  doc.moveDown(0.5);

  // Cabeçalho simples (logo opcional)
  // if (logoPath) doc.image(logoPath, doc.x, doc.y, { width: 100 });
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(payload.titulo, { align: "center" });
  doc.moveDown(1);

  // Cidade e data
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`${payload.cidade}, ${formatDateCredencial(payload.data)}`, {
      align: "right",
    });
  doc.moveDown(1);

  // Destinatário
  doc.font("Helvetica-Bold").fontSize(12).text(payload.destinatario);
  doc.moveDown(0.5);

  // Corpo (array de parágrafos)
  doc.font("Helvetica").fontSize(12);
  payload.corpo.forEach((paragrafo) => {
    doc.text(paragrafo, { align: "justify", paragraphGap: 6 });
    doc.moveDown(0.5);
  });

  doc.moveDown(1);

  doc.moveDown(2);

  // Bloco de assinatura
  // const signatureX = doc.x;
  const sigWidth = 250;
  doc.moveDown(2);
  doc.text("Atenciosamente,", { continued: false });
  doc.moveDown(4);

  // Linha para assinatura
  const currX = doc.x;
  const sigY = doc.y;
  doc
    .moveTo(currX, sigY + 40)
    .lineTo(currX + sigWidth, sigY + 40)
    .stroke();
  doc.text(payload.assinante.nome, currX, sigY + 45, {
    width: sigWidth,
    align: "left",
  });
  doc.text(payload.assinante.cargo, currX, sigY + 60, {
    width: sigWidth,
    align: "left",
  });

  // Rodapé opcional
  doc.fontSize(9).fillColor("gray");
  doc.text(
    `Documento gerado por ${payload.empresa}`,
    doc.page.margins.left,
    doc.page.height - doc.page.margins.bottom - 30,
    {
      align: "center",
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
    }
  );

  doc.end();
});

// ======================================== INICIANDO SERVER ========================================

app.listen(port, ip, () =>
  console.log(`🔥 Servidor rodando na porta :${port}`)
);
