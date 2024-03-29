import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";


export const SinglePostPage = () => {

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogposts/${id}`)
        .then(res => {
            res.json()
            .then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, []);

    if (!postInfo) return "";

    const userInfo = null;

    return (
        <section className="my-24"
        >
            <Container className="space-y-8 font-serif"
            >
                <div className="space-y-5"
                >
                    <h1 className="text-5xl font-bold tracking-wider"
                    >{postInfo.title}</h1>

                    <div className="flex justify-between border-b-2 items-center  text-gray-600 text-lg " 
                    >
                        <div className="flex gap-5 items-center"
                        >
                            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time> |
                            <p>By: {postInfo.author.username}</p>
                        </div>

                        <div className="flex items-center gap-5"
                        >

                            {/* {!userInfo.id == postInfo.author._id && ( */}
                                <div className="flex gap-5"
                                >
                                    <Link to={`/edit/${postInfo._id}`}
                                            className=""
                                    >
                                        <Button className="text-lg flex items-center gap-x-5 px-5 py-5 text-right"
                                        > <FaEdit /> Edit Post</Button>
                                    </Link>

                                    <Link to={`/edit/${postInfo._id}`}
                                            className=""
                                    >
                                        <Button className="text-lg bg-red-800 hover:bg-red-600 flex items-center gap-x-5 px-5 py-5 text-right"
                                        > <MdOutlineDeleteOutline /> Delete Post</Button>
                                    </Link>
                                </div>
                            {/* // )} */}
                        </div>
                    </div>
                </div>
                <div className="w-full"
                >
                    <img    src={`http://localhost:5000/${postInfo.cover}`} 
                            className="w-full max-h-[500px] bg-cover object-cover"
                    />
                </div>

                <div className="space-y-8"
                >
                    <div    dangerouslySetInnerHTML={{__html: postInfo.content}}
                            className="text-2xl"
                    />
                </div>
            </Container>
        </section>
    )
}
