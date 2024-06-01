import { useState, useEffect, useContext } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { UserContext } from '@/context/UserContext';
import { MdDeleteOutline } from "react-icons/md";

interface Comment {
    _id: string;
    content: string;
    author: {
        username: string;
    };
    likes: number;
    postId: string;
}

interface User {
    _id: string;
    username: string;
}

interface Props {
    postId?: string;
    postInfo?: any
}

const Comments = ({ postId, postInfo }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (postId) {
            fetchComments(postId);
            fetchUsers();
        }
    }, [postId]);

    const fetchComments = async (postId: string) => {
            await fetch(`http://localhost:5000/api/comments/${postId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch comments!');
                }
                return res.json();
            })
            .then(postInfo => setComments(postInfo))
            .catch(err => {
                setError(err.message);
            });
        };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/blogposts/`);
            if (!res.ok) {
                throw new Error('Failed to fetch users!');
            }
            const data = await res.json();
            setUsers(data);
        } catch (err: any) {
            setError(err?.message);
        }
    };

    const handleAddComment = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId,
                    author: userInfo?.id,
                    content: newComment 
                    }),
                credentials: 'include'
            });
            if (res.ok) {
                const newCommentData: Comment = await res.json();
                setComments([...comments, newCommentData]);
                setNewComment('');
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setComments(comments.filter(comment => comment._id !== commentId));
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="comments-section">
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            <div className="comment-input flex mb-4">
                <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border rounded py-2 px-3 mr-2 w-full"
                    placeholder="Add a comment..."
                />
                <Button onClick={handleAddComment} className="text-white py-3 px-5 rounded">
                    Add
                </Button>
            </div>
            <ul>
                {comments.map(comment => (
                    // Only display comments with matching postId
                    comment.post === postId &&
                    <li key={comment._id} className="mb-4">
                        <p className="text-xl font-bold">{comment.content}</p>

                        <div className='flex items-center gap-5 text-[1rem] font-mono pl-3'
                        >
                       
                            <p className="text-gray-500">
                                By: {comment.author.username || 'Anonymous'}
                            </p>

                            
                            
                            {userInfo?.id === postInfo.author._id && comment._id &&
                            <>
                                <p>|</p>
                                <div className="mt-2">
                                    <button onClick={() => handleDeleteComment(comment._id)}        className="hover:text-red-700">
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </>
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
