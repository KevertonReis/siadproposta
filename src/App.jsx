import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCadCliente from "./components/FormCadCliente";
import FormCadProposta from "./components/FormCadProposta";
import Menu from "./components/Menu";
import FormDadosOrc from "./components/FormDadosOrc";

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
