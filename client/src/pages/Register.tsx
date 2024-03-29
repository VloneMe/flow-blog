import { FormEvent, useState } from "react"
import { Container } from "../components/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Navigate } from "react-router-dom"


export const Register = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false)

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })

        if (res.status == 200){
            alert("Registration Succesfully!")
            setRegistered(true)
        }

        alert('Regisration Failed!')
    }

    if (registered){
        return <Navigate to={'/login'} />
    }
    return (
        <section className="min-h-screen w-full flex items-center">
            <Container className=""
            >
                <form   onSubmit={register} 
                        className="border border-gray-400 px-4 py-6 rounded-lg space-y-5 max-w-[40rem] mx-auto"
                >
                    {username} {password}
                    <h2 className="text-3xl text-center py-5"
                    >Register Page</h2>

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
                    >Register</Button>
                </form>
            </Container>
        </section>
    )
}
