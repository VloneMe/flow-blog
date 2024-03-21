import { Container } from "../components/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"


export const Register = () => {
  return (
    <section className="min-h-screen w-full flex items-center">
        <Container className=""
        >
            <form className="border border-gray-400 px-4 py-6 rounded-lg space-y-5 max-w-[40rem] mx-auto"
            >
                <h2 className="text-3xl text-center py-5"
                >Register Page</h2>

                <Input  type="password"
                        placeholder="username"
                />
                <Input  type="text"
                        placeholder="password"
                />

                <Button className="w-full"
                >Register</Button>
            </form>
        </Container>
    </section>
  )
}
