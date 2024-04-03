import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { UserContext } from '@/context/UserContext';
import Comments from '@/components/common/Comments';

export const SinglePostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [postInfo, setPostInfo] = useState<any>(null);
    const { userInfo } = useContext(UserContext);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [display, setDisplay] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/blogposts/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch post');
                    }
                    return res.json();
                })
                .then(postInfo => setPostInfo(postInfo))
                .catch(err => {
                    setError(err.message);
                });
        }
    }, [id]);

    const deletePost = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/blogposts/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                alert('Post Successfully Deleted!');
                setDeleted(true);
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (!postInfo) {
        if (error) {
            return <p>Error: {error}</p>;
        }
        return null;
    }

    if ((!(userInfo && userInfo.id) === postInfo.author._id)) {
        setDisplay(true);
        return <Navigate to={'/'} />;
    }

    if (deleted) {
        return <Navigate to={'/'} />;
    }

    return (
        <section className="my-24">
            <Container className="space-y-8 font-serif">
                <div className="space-y-5">
                    <h1 className="text-5xl font-bold tracking-wider">{postInfo.title}</h1>
                    <div className={`flex border-b-2 items-center text-gray-600 text-lg justify-between`}>
                        <div className={`flex items-center ${display ? 'justify-between' : 'gap-5'}`}>
                            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
                            {!display && <span>|</span>}
                            <p className="capitalize">By: {postInfo.author.username}</p>
                        </div>
                        <div className="flex items-center gap-5">
                            {userInfo?.id === postInfo.author._id && (
                                <div className="flex gap-5">
                                    <Link to={`/edit/${postInfo._id}`} className="">
                                        <Button className="text-lg flex items-center gap-x-5 px-5 py-5 text-right">
                                            <FaEdit /> Edit Post
                                        </Button>
                                    </Link>
                                    <Button onClick={deletePost} className="text-lg bg-red-800 hover:bg-red-600 flex items-center gap-x-5 px-5 py-5 text-right">
                                        <MdOutlineDeleteOutline /> Delete Post
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <img src={`http://localhost:5000/${postInfo.cover}`} className="w-full max-h-[500px] bg-cover object-cover" />
                </div>
                <div className="w-full bg-slate-600/50 border-l-8 border-green-700 rounded-md">
                    <p className="text-2xl font-mono p-10 tracking-wide">{'"' + postInfo.summary}</p>
                </div>
                <div className="space-y-8">
                    <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="text-2xl" />
                </div>
                <Comments postId={id} postInfo={postInfo} 
                />
            </Container>
        </section>
    );
};
