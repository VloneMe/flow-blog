import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, Navigate, useParams } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { UserContext } from "@/context/UserContext";


export const SinglePostPage = () => {

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const [deleted, setDeleted] = useState(false);
    const [display, setDisplay] = useState(false);
    

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogposts/${id}`)
        .then(res => {
            res.json()
            .then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, []);

    const deletePost = async () => {
        const res = await fetch(`http://localhost:5000/api/blogposts/${id}`, {
            method: 'DELETE',
        });

        if (res.ok){
            alert("Post Succesfully Deleted!")
            setDeleted(true);
        }
    }

    if (!postInfo) return "";

    // for None User edit access
    if ((!(userInfo && userInfo.id) === postInfo.author._id)) {
        setDisplay(true);
        return <Navigate to={'/'} />;
        useEffect(() => {
            window.location.reload();
        }, [])
    }

    if (deleted){
        return <Navigate to={'/'} />
        useEffect(() => {
            window.location.reload();
        }, [])
    }

    return (
        <section className="my-24"
        >
            <Container className="space-y-8 font-serif"
            >
                <div className="space-y-5"
                >
                    <h1 className="text-5xl font-bold tracking-wider"
                    >{postInfo.title}</h1>

                    <div className={`flex border-b-2 items-center  text-gray-600 text-lg
                                    justify-between`} 
                    >
                        <div className={`flex items-center ${display ? 'justify-between': 'gap-5'}`}
                        >
                            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time> 
                            {!display && <span>|</span>}
                            <p className="capitalize"
                            >By: {postInfo.author.username}</p>
                        </div>

                        <div className="flex items-center gap-5"
                        >

                            {userInfo.id === postInfo.author._id && (
                                <div className="flex gap-5"
                                >
                                    <Link to={`/edit/${postInfo._id}`}
                                            className=""
                                    >
                                        <Button className="text-lg flex items-center gap-x-5 px-5 py-5 text-right"
                                        > <FaEdit /> Edit Post</Button>
                                    </Link>

                                    
                                    <Button     onClick={deletePost}
                                                className="text-lg bg-red-800 hover:bg-red-600 flex items-center gap-x-5 px-5 py-5 text-right"
                                    > <MdOutlineDeleteOutline /> Delete Post</Button>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full"
                >
                    <img    src={`http://localhost:5000/${postInfo.cover}`} 
                            className="w-full max-h-[500px] bg-cover object-cover"
                    />
                </div>

                <div className="w-full bg-slate-600/50 border-l-8 border-green-700 rounded-md"
                >
                    <p className="text-2xl font-mono p-10 tracking-wide"
                    >{'"'+postInfo.summary}</p>
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
