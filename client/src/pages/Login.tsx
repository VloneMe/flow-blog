import { Container } from "../components/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"


export const Login = () => {
  return (
    <section className="min-h-screen w-full flex items-center">
        <Container className=""
        >
            <form className="border border-gray-400 px-6 py-10 rounded-lg space-y-5 max-w-[40rem] mx-auto"
            >
                <h2 className="text-3xl text-center pb-5"
                >Login Page</h2>

                <Input  type="text"
                        placeholder="username"
                />
                <Input  type="password"
                        placeholder="password"
                />

                <Button className="w-full"
                >Login</Button>
            </form>
        </Container>
    </section>
  )
}
