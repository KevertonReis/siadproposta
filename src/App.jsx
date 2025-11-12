import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCadCliente from "./components/form-cad/FormCadCliente";
import FormCadProposta from "./components/form-cad/FormCadProposta";
import Menu from "./components/menu/Menu";
import FormDadosOrc from "./components/form-cad/FormDadosOrc";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cadcliente" element={<FormCadCliente />} />
          <Route path="/cadproposta" element={<FormCadProposta />} />
          <Route path="/orcamento" element={<FormDadosOrc />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
