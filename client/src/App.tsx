import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/layout/index.tsx";
import { Home } from "./pages/main.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}
        >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Route>
      </Routes>
    </>
  )
}