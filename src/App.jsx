import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormCadCliente from "./components/form-cad/form-cad-cliente/FormCadCliente";
import FormCadProposta from "./components/form-cad/form-cad-proposta/FormCadProposta";
import FormDadosOrc from "./components/form-cad/form-cad-orcamento/FormDadosOrc";
import FormEditProposta from "./components/form-edit/form-edit-proposta/FormEditProposta";
import LayoutPrincipal from "./components/Layout/LayoutPrincipal";
import CartaCredenciamento from "./components/carta-cred/CartaCredenciamento";
import MenuCadDiversos from "./components/form-cad/form-cad-diversos/menu-cad-diversos/MenuCadDiversos";
import FormCadRamo from "./components/form-cad/form-cad-diversos/FormCadRamo";

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
            <Route path="credencial" element={<CartaCredenciamento />} />
            <Route path="diversos" element={<MenuCadDiversos />}>
              <Route index element="" />
              <Route path="cadramo" element={<FormCadRamo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
