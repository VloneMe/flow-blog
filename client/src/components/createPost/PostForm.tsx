import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { QuillEditor } from "./QuillEditor";
import { Navigate } from "react-router-dom";


export const  PostForm = () => {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | string>('')
  const [redirect, seRedirect] = useState(false);

  const handleContentChange = (newValue: string) => {
    setContent(newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };
  
  const createNewPost = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const res = await fetch('http://localhost:5000/api/blogposts/', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });

    if (res.ok){
      seRedirect(true);
    }
  }

  if (redirect){
    return <Navigate to='/' />
  }
  return (
    <form onSubmit={createNewPost} 
          className="space-y-6 border p-6"
    >
      <h2 className="text-center text-2xl font-bold"
      >Make Your New Post</h2>

      <Input  type="text"
              placeholder={'Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
      />

      <Input  type="summary"
              placeholder={'Summary'}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
      />

      <Input  type="file"
              onChange={handleFileChange}
      />

      <QuillEditor  theme={'snow'}
                    value={content}
                    onChange={handleContentChange}
      />

      <Button className="w-full"
      >
        Create Post
      </Button>
    </form>
  )
}