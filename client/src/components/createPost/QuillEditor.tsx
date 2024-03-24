import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


interface Props {
    value?: string;
    onChange?: (newValue: string) => void;
    theme?: string;
}


export const QuillEditor = (
    {theme, value, onChange}: Props
    ) => {

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      };
  return (
    <ReactQuill modules={modules}
                value={value}
                theme={theme}
                onChange={onChange}
    />
  )
}
