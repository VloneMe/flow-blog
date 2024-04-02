import { FormEvent, useState } from "react"
import { Container } from "../components/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Navigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const Register = () => {

    const [username, setUserName] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registered, setRegistered] = useState(false)
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd1, setShowPwd1] = useState(false);


    const checkEmailExists = async (email: string): Promise<boolean> => {
        try {
            const response = await fetch(`http://localhost:5000/api/users?email=${encodeURIComponent(email)}`);
            return response.status === 200;
        } catch (error) {
            console.error("Error checking email existence:", error);
            return false;
        }
    }

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            alert("Email already exists!\nThis email is already in use.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            body: JSON.stringify({username, fullname, email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (res.status === 200) {
            alert("Registration Successfully!");
            setRegistered(true);
        } else {
            alert('Registration Failed!');
        }
    }

    if (registered) {
        return <Navigate to={'/login'} />;
    }

    return (
        <section className="min-h-screen w-full flex items-center">
            <Container className=""
            >
                <form   onSubmit={register} 
                        className="border border-gray-400 px-4 py-6 rounded-lg space-y-5 max-w-[40rem] mx-auto"
                >
                    <h2 className="text-3xl text-center py-5"
                    >Register Page</h2>

                    <Input  type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                    />

                    <Input  type="text"
                            placeholder="Full name"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            required
                    />

                    <Input  type="text"
                            placeholder="username"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            required
                    />

                    <div className="relative flex items-center"
                    >
                        <Input  type={showPwd ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                        />

                        <div    onClick={() => setShowPwd(!showPwd)}    
                                className="absolute right-5"
                        >
                            {!(showPwd && password !== "") ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    <div className="relative flex items-center"
                    >
                        <Input  type={showPwd1 ? 'text' : 'password'}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                        />

                        <div    onClick={() => setShowPwd1(!showPwd1)}    
                                className="absolute right-5"
                        >
                            {!(showPwd1 && confirmPassword !== "") ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    <Button className="w-full"
                    >Register</Button>
                </form>
            </Container>
        </section>
    )
}
