import { Post } from "../components/post"
import { data } from "../constatnts"


export const Home = () => {
  return (
    <div className="space-y-6 mt-24"
    >
        {data.map((data, index) => (
        <Post _id={index + 1}
                src={data.img}
                title={data.title}
                author={data.author}
                summary={data.summary}
                key={index + 1}
                date={data.date}
        />
        ))}
    </div>
  )
}
