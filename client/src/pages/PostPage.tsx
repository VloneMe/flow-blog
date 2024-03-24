import { useEffect, useState } from "react";
import { Post } from "../components/post";
import { data } from "../constants";

interface PostData {
  _id: string;
  img: string;
  title: string;
  author: string;
  summary: string;
  date: string;
}

export const PostPage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogposts')
      .then(res => res.json())
      .then((fetchedPosts: PostData[]) => { // Corrected syntax for specifying type of fetchedPosts
        setPosts(fetchedPosts);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="space-y-6 mt-24">
      {/* Mapping over fetched posts instead of static data */}
      {posts.map((post, index) => (
        <Post
          _id={post._id}
          src={post.img}
          title={post.title}
          author={post.author}
          summary={post.summary}
          key={index + 1}
          date={post.date}
        />
      ))}
    </div>
  );
};
