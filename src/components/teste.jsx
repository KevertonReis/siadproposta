import React, { useState, useEffect } from "react";

export default function FormCadCliente() {
  const [formData, setFormData] = useState({
    razaoSocial: "",
    status: "",
    tipoCliente: "",
    vendedor: "",
    anotacoes: "",
  });

  const [statusList, setStatusList] = useState([]);
  const [tiposList, setTiposList] = useState([]);
  const [vendedoresList, setVendedoresList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [st, tp, vd] = await Promise.all([
        fetch("http://localhost:3001/api/status").then((r) => r.json()),
        fetch("http://localhost:3001/api/tipos").then((r) => r.json()),
        fetch("http://localhost:3001/api/vendedores").then((r) => r.json()),
      ]);
      setStatusList(st);
      setTiposList(tp);
      setVendedoresList(vd);
    }
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Cliente cadastrado com sucesso!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Cadastro de Cliente</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Razão Social */}
        <div>
          <label className="block mb-1">Razão Social</label>
          <input
            className="w-full border p-2 rounded"
            value={formData.razaoSocial}
            onChange={(e) => handleChange("razaoSocial", e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Status</label>
          <select
            className="w-full border p-2 rounded"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {statusList.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.DESCRICAO}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Cliente */}
        <div>
          <label className="block mb-1">Tipo de Cliente</label>
          <select
            className="w-full border p-2 rounded"
            value={formData.tipoCliente}
            onChange={(e) => handleChange("tipoCliente", e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {tiposList.map((t) => (
              <option key={t.ID} value={t.ID}>
                {t.DESCRICAO}
              </option>
            ))}
          </select>
        </div>

        {/* Vendedor */}
        <div>
          <label className="block mb-1">Vendedor</label>
          <select
            className="w-full border p-2 rounded"
            value={formData.vendedor}
            onChange={(e) => handleChange("vendedor", e.target.value)}
          >
            <option value="">Selecione...</option>
            {vendedoresList.map((v) => (
              <option key={v.ID} value={v.ID}>
                {v.NOME}
              </option>
            ))}
          </select>
        </div>

        {/* Anotações */}
        <div>
          <label className="block mb-1">Anotações</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="4"
            value={formData.anotacoes}
            onChange={(e) => handleChange("anotacoes", e.target.value)}
          ></textarea>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
