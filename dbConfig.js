import firebird from "node-firebird";


export const options = {
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

const pool = firebird.pool(10, options);


export function executarConsulta(query, params = []) {
  return new Promise((resolve, reject) => {
    pool.get((err, db) => {
      if (err) {
        console.error("❌ Erro ao obter conexão do pool:", err.message);
        return reject(
          new Error(`Falha ao conectar ao banco de dados: ${err.message}`)
        );
      }
      db.query(query, params, (err, result) => {
        if (err) {
          console.error(
            `Erro ao executar consulta no Firebird: ${err.message}`
          );
          console.error(`Query: ${query}`);
          console.error(`Parâmetros: ${JSON.stringify(params)}`);
          db.detach();
          return reject(new Error(`Erro ao executar consulta: ${err.message}`));
        }

        if (!result || !Array.isArray(result)) {
          result = [];
        }
        db.detach();
        resolve(result);
      });
    });
  });
}