import Editor from 'react-simple-wysiwyg';

const CustomEditor = ({ value, onChange }:any) => {
    return (
        <Editor style={{height:"150px"}} value={value} onChange={onChange} />
    );
}

export default CustomEditor;
