import { useEffect, useState } from "react";
import { Post } from "../components/post";

interface PostData {
  _id: string;
  cover: string;
  title: string;
  author: string;
  summary: string;
  createdAt: string;
}

export const PostPage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogposts')
      .then(res => res.json())
      .then((fetchedPosts: PostData[]) => {
        setPosts(fetchedPosts);
      })
      .catch(error => {
        console.error('Error fetching blog posts: ', error);
      });
  }, []);
  return (
    <div className="md:space-y-10 space-y-8 mt-24">
      {posts.length > 0 && posts.map((post, index) => (
        <Post key={index + 1} {...post}
        />
      ))}
    </div>
  );
};