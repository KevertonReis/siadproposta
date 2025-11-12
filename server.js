import express from "express";
import cors from "cors";
import Firebird from "node-firebird";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

// 🔧 Configuração da conexão do banco
const options = {
  host: "192.168.0.142",
  database: "e:\\sys\\sistemas\\pluri\\banco\\PROPOSTA.FDB",
  user: "SYSDBA",
  password: "masterkey",
  charset: "WIN1252",
  lc_ctype: "WIN1252",
  pageSize: 8196,
  retryConnectionInterval: 1000,
  wireCrypt: false,
};

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

// GET - TABELAS AUXILIARES, STATUS, TIPO...

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

app.get("/api/proposta/:codigo", (req, res) => {
  const { codigo } = req.params;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query("SELECT * FROM CONSULTA_PROPOSTA WHERE NROPRO = ?", [codigo], (err, result) => {
      db.detach();
      if (err) return res.status(500).json({ error: err.message });

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Proposta não encontrada" });
      }

      res.json(result[0]);
    });
  });
});

// POST - CADASTRO DE CLIENTE
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

// POST - CADASTRO PROPOSTA
app.post("/api/enviarproposta", (req, res) => {
  const {
    dataProposta,
    statusVistoria,
    empresa,
    licitacao,
    plataforma,
    tipoReajuste,
    observacoes,
    repLegal,
    codVistoriador,
    nomeFantasia,
    codCliente,
  } = req.body;

  Firebird.attach(options, (err, db) => {
    if (err) return res.status(500).json({ erro: "Falha na conexão" });

    const sql = `INSERT INTO PROPOSTA_TB (DATA_PRO, STATUS, EMP_PRO, LICITACAO,
                                          PLATAFORMA, TIPO_REAJUSTE, OBSERVACOES, REP_LEGAL, 
                                          COD_VIS, NOME_FANTASIA, COD_CLI)
                 VALUES (?,?,?,?,?,?,?,?,?,?,?);
    `;
    db.query(
      sql,
      [
        dataProposta,
        statusVistoria,
        empresa,
        licitacao,
        plataforma,
        tipoReajuste,
        observacoes,
        repLegal,
        codVistoriador,
        nomeFantasia,
        codCliente,
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

app.listen(port, () =>
  console.log(`🔥 Servidor rodando em http://localhost:${port}`)
);
