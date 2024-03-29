import { Container } from "@/components/Container";
import { QuillEditor } from "@/components/createPost/QuillEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";


export const EditPostPage = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<FileList | string>('')
    const [redirect, setRedirect] = useState(false);

    const handleContentChange = (newValue: string) => {
        setContent(newValue);
      };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFiles(e.target.files);
        }
      };

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogposts/${id}`)
        .then(res => {
            res.json()
            .then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
        })
    }, []);

    const updatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        
        if (files?.[0]){
            data.set('file', files?.[0]);
        }

        const res = await fetch(`http://localhost:5000/api/blogposts/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });

        if (res.ok){
            setRedirect(true);
        }
    };

    if (redirect){
        return <Navigate to={`/post/${id}`} />
    }

    return (
        <section className="mt-24"
        >
            <Container>
                <form onSubmit={updatePost} 
                    className="space-y-6 border p-6"
                    >
                    <h2 className="text-center text-2xl font-bold"
                    >Edit Your Post</h2>

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
                        Update Post
                    </Button>
                </form>
            </Container>
        </section>
    )
}