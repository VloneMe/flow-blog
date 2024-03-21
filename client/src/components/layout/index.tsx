import { Outlet } from "react-router-dom"
import { Navbar } from "../navbar"


export const Layout = () => {
  return (
    <main className="min-h-screen"
    >
        <Navbar />
        <Outlet />
    </main>
  )
};
