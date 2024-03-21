import { Link } from "react-router-dom"
import { Container } from "../Container";
import { FaRegPenToSquare } from "react-icons/fa6";


export const Navbar = () => {
  return (
    <nav className="w-full h-[70px] border-b-2 bg-white border-gray-200 flex items-center fixed left-0 top-0 "
    >
        <Container className="flex justify-between items-center"
        >
            <Link   to="/"
                    className="text-3xl font-serif font-bold"
            > The Flow </Link>

            <div className="space-x-4 flex text-lg capitalize items-center"
            >
                <Link to="/" className="flex items-center gap-2 border hover:bg-gray-200 border-gray-400 px-4 py-2 rounded-lg"
                > new <FaRegPenToSquare /></Link>
                <Link to="/login"
                > login</Link>
                <Link to="/register"
                > register</Link>
            </div>
        </Container>
    </nav>
  )
}