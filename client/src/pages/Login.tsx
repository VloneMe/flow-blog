import { FormEvent, useState } from "react"
import { Container } from "../components/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Navigate } from "react-router-dom"


export const Login = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const Login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (res.ok){
            setRedirect(true)
        }else {
            alert("Wrong credentials!");
        }
    }

    if (redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <section className="min-h-screen w-full flex items-center">
        <Container className=""
        >
            <form   onSubmit={Login} 
                    className="border border-gray-400 px-6 py-10 rounded-lg space-y-5 max-w-[40rem] mx-auto"
            >
                <h2 className="text-3xl text-center pb-5"
                >Login Page</h2>

                <Input  type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                />
                <Input  type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                />

                <Button className="w-full"
                >Login</Button>
            </form>
        </Container>
    </section>
  )
}
