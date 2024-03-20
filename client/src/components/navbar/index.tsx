import { Link } from "react-router-dom"
import { Container } from "../Container"


export const Navbar = () => {
  return (
    <nav className="w-full h-[70px] border-b-2 bg-white border-gray-200 flex items-center fixed left-0 top-0 "
    >
        <Container className="flex justify-between"
        >
            <Link   to="/"
                    className="text-3xl font-serif font-bold"
            > The Flow </Link>

            <div className="space-x-4 flex text-lg capitalize"
            >
                <Link to="/"
                > create post</Link>
                <Link to="/"
                > register</Link>
            </div>
        </Container>
    </nav>
  )
}