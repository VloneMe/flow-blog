import { Link } from "react-router-dom"
import { Container } from "../Container";
import { format } from "date-fns";

interface Props {
    _id: string;
    title: string;
    author: string;
    summary: string;
    cover: string;
    createdAt: string;
}

export const Post = (
    {_id, title, author, summary, cover, createdAt}: Props
) => {
  return (
    <Container className="w-full border-b pb-5"
    >
        <div className="gap-5 grid grid-cols-5">
            <div className="col-span-2 rounded-lg">
                <Link to={`/post/${_id}`}>
                    <img    src={`http://localhost:5000/${cover}`}
                            alt=""
                            className="rounded-md max-h-[20rem] w-full object-cover object-center"
                    />
                </Link>
            </div>
            <div className="text-xl space-y-5 col-span-3 capitalize">
                <Link to={`/post/${_id}`}>
                <h2 className="text-5xl hover:text-green-700 tracking-wide"
                >{title}</h2>
                </Link>
                <p className="flex gap-3 justify-between border-b border-green-500 pb-3"
                >
                <a className="author">{author.username}</a>
                <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className="text-lg"
                >{summary}</p>
            </div>
        </div>
    </Container>
  )
};