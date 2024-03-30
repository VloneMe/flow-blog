import { Link } from "react-router-dom"
import { Container } from "../Container";
import { useContext, useEffect } from "react";
import { NewPost } from "../common/NewPost";
import { UserContext } from "@/context/UserContext";
import { IoIosLogOut } from "react-icons/io";


export const Navbar = () => {

  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/profile', {
      credentials: 'include'
    }).then((res: Response) => {
      res.json().then(userinfo => {
        setUserInfo(userinfo)
      })
    })
  }, []);

  const logout = () => {
    fetch('http://localhost:5000/api/logout', {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <nav className="w-full h-[70px] border-b-2 bg-white border-gray-200 flex items-center fixed left-0 top-0 z-10"
    >
        <Container className="flex justify-between items-center"
        >
            <Link   to="/"
                    className="text-3xl font-serif font-bold"
            > The Flow </Link>

            <div className="space-x-4 flex text-lg capitalize items-center cursor-pointer"
            >

              {
                username && (
                  <>
                    <NewPost />
                    <p className="size-12 border-2 rounded-full bg-slate-600 text-white text-2xl flex items-center justify-center font-extrabold"
                    >{username?.split('')[0]}</p>

                    <div className="flex gap-2 items-center text-lg"
                    >
                    <a onClick={logout}
                    >Logout</a> 
                    <IoIosLogOut size={30}
                    />
                    </div>
                  </>
                )
              }
              {
                !username && (
                  <div className="flex items-center space-x-4">
                    <Link to="/login"
                    > login</Link>
                    <Link to="/register"
                    > register</Link>
                  </div>
                )
              }
            </div>
        </Container>
    </nav>
  )
}