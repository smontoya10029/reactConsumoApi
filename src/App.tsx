import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Nuevo } from "./components/Nuevo"
import { Lista } from "./components/Lista"
import { Editar } from "./components/Editar"


function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Lista/>}/>
      <Route path="/Guardar" element={<Nuevo/>}/>
      <Route path="/Editar/:id" element={<Editar/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
