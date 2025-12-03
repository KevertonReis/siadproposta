import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCadCliente from "./components/form-cad/form-cad-cliente/FormCadCliente";
import FormCadProposta from "./components/form-cad/form-cad-proposta/FormCadProposta";
import Menu from "./components/menu/Menu";
import FormDadosOrc from "./components/form-cad/form-cad-orcamento/FormDadosOrc";
import FormEditProposta from "./components/form-edit/form-edit-proposta/FormEditProposta";
import LayoutPrincipal from "./components/Layout/LayoutPrincipal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutPrincipal />}>
            <Route index element="" />
            <Route path="cadcliente" element={<FormCadCliente />} />
            <Route path="cadproposta" element={<FormCadProposta />} />
            <Route path="orcamento" element={<FormDadosOrc />} />
            <Route path="editproposta" element={<FormEditProposta />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
