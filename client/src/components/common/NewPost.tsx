import { Link } from 'react-router-dom';
import { FaRegPenToSquare } from "react-icons/fa6";

export const NewPost = () => {
  return (
    <Link   to="/create" 
            className="flex items-center gap-2 border 
                        hover:bg-gray-200 border-gray-400 
                        px-4 py-2 rounded-lg"
    > new <FaRegPenToSquare /></Link>
  )
}
