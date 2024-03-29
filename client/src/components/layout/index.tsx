import { Outlet } from "react-router-dom"
import { Navbar } from "../navbar"
import { Footer } from "../footer";


export const Layout = () => {
  return (
    <main className="min-h-screen"
    >
        <Navbar />
        <Outlet />
        <Footer />
    </main>
  )
};
