import { Link } from "react-router-dom"
import { Container } from "../Container";

interface Props {
    _id: number;
    title: string;
    author: string;
    summary: string;
    src: string;
    date: string;
}

export const Post = (
    {_id, title, author, summary, src, date}: Props
) => {
  return (
    <Container className="w-full border-b pb-5"
    >
        <div className="gap-5 grid grid-cols-5">
            <div className="col-span-2 rounded-lg">
                <Link to={`/post/${_id}`}>
                <img src={src} alt=""
                        className=" rounded-md"
                />
                </Link>
            </div>
            <div className="text-xl space-y-5 col-span-3 capitalize">
                <Link to={`/post/${_id}`}>
                <h2 className="text-5xl hover:text-green-700"
                >{title}</h2>
                </Link>
                <p className="flex gap-3 justify-between border-b border-green-500 pb-3"
                >
                <a className="author">{author}</a>
                <time>{date}</time>
                </p>
                <p>{summary}</p>
            </div>
        </div>
    </Container>
  )
}
