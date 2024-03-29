import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/layout/index.tsx";
import { Home } from "./pages/main.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { CreatePost } from "./components/createPost/index.tsx";
import { SinglePostPage } from "./pages/SinglePostPage.tsx";
import { EditPostPage } from "./pages/EditPostPage.tsx";



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}
        >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/create" element={<CreatePost />}/>
          <Route path="/post/:id" element={<SinglePostPage />}/>
          <Route path="/edit/:id" element={<EditPostPage />}/>
        </Route>
      </Routes>
    </>
  )
}