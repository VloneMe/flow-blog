import { Container } from "../Container"
import { PostForm } from "./PostForm"


export const  CreatePost = () => {
    return (
      <section className="min-h-screen mt-24"
      >
          <Container>
              <PostForm />
          </Container>
      </section>
    )
  }
